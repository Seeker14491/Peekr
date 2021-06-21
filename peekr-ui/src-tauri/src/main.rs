#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use parking_lot::Mutex;
use peekr_core::{CarDirectives, TelemetryReceiver};

struct State {
    telemetry: TelemetryReceiver,
}

type TelemetryJson = String;

fn main() {
    let telemetry = TelemetryReceiver::init(19545).expect("TODO");
    let state = State { telemetry };

    tauri::Builder::default()
        .manage(Mutex::new(state))
        .invoke_handler(tauri::generate_handler![
            poll_telemetry,
            decode_car_directives
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn poll_telemetry(state: tauri::State<Mutex<State>>) -> Option<TelemetryJson> {
    state
        .lock()
        .telemetry
        .get_last_message()
        .map(|message| message.telemetry_json)
}

#[tauri::command]
fn decode_car_directives(bits: i32) -> CarDirectives {
    CarDirectives::from_bits(bits)
}
