#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use parking_lot::Mutex;
use peekr_core::{CarDirectives, Message, TelemetryReceiver};
use std::mem;

struct State {
    telemetry: TelemetryReceiver,
    msg_buffer: Vec<Message>,
    msg_number: i64,
}

type TelemetryJson = String;

fn main() {
    let telemetry = TelemetryReceiver::new(19545, 100).expect("TODO");
    let state = State {
        telemetry,
        msg_buffer: Vec::with_capacity(100),
        msg_number: 0,
    };

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
    let mut state = state.lock();
    let mut msg_buffer = mem::take(&mut state.msg_buffer);
    let prev_msg_number = state.msg_number;
    let (msg_number, _skipped) = state
        .telemetry
        .get_pending(&mut msg_buffer, prev_msg_number);
    state.msg_buffer = msg_buffer;
    state.msg_number = msg_number;

    state
        .msg_buffer
        .get_mut(0)
        .map(|msg| mem::take(&mut msg.telemetry_json))
}

#[tauri::command]
fn decode_car_directives(bits: i32) -> CarDirectives {
    CarDirectives::from_bits(bits)
}
