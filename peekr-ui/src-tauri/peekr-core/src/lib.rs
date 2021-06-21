pub use car_directives::CarDirectives;

use parking_lot::Mutex;
use std::net::{Ipv4Addr, SocketAddrV4, UdpSocket};
use std::sync::Arc;
use std::time::Duration;
use std::{io, thread};

mod car_directives;

#[derive(Debug)]
pub struct TelemetryReceiver {
    inner: Arc<Mutex<TelemetryReceiverInner>>,
}

impl TelemetryReceiver {
    pub fn init(port: u16) -> io::Result<Self> {
        let loopback = Ipv4Addr::new(127, 0, 0, 1);
        let socket = UdpSocket::bind(SocketAddrV4::new(loopback, port))?;

        let inner: Arc<Mutex<TelemetryReceiverInner>> =
            Arc::new(Mutex::new(TelemetryReceiverInner { message: None }));

        let inner_clone = inner.clone();

        thread::spawn(move || {
            let mut buf = vec![0; 4096];
            loop {
                let bytes_read = match socket.recv_from(&mut buf) {
                    Ok((bytes_read, _)) => bytes_read,
                    Err(_) => {
                        thread::sleep(Duration::from_secs(1));
                        continue;
                    }
                };

                let message = match Message::from_bytes(buf[..bytes_read].to_vec()) {
                    Ok(x) => x,
                    Err(_) => {
                        eprintln!("error: the JSON string received was not valid UTF-8");
                        continue;
                    }
                };

                let mut guard = inner.lock();
                guard.message = Some(message);
            }
        });

        Ok(TelemetryReceiver { inner: inner_clone })
    }

    pub fn get_last_message(&self) -> Option<Message> {
        self.inner.lock().message.clone()
    }
}

#[derive(Debug)]
struct TelemetryReceiverInner {
    message: Option<Message>,
}

#[derive(Debug, Clone, Default, Hash, Eq, PartialEq, Ord, PartialOrd)]
pub struct Message {
    pub telemetry_json: String,
}

impl Message {
    fn from_bytes(bytes: Vec<u8>) -> Result<Self, std::string::FromUtf8Error> {
        Ok(Message {
            telemetry_json: String::from_utf8(bytes)?,
        })
    }
}
