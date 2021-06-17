pub use car_directives::CarDirectives;

use az::Az;
use parking_lot::Mutex;
use std::net::{Ipv4Addr, SocketAddrV4, UdpSocket};
use std::sync::Arc;
use std::time::Duration;
use std::{cmp, io, thread};
use tap::prelude::*;

mod car_directives;

#[derive(Debug)]
pub struct TelemetryReceiver {
    inner: Arc<Mutex<TelemetryReceiverInner>>,
    max_buffer_size: i64,
}

impl TelemetryReceiver {
    pub fn new(port: u16, max_buffer_size: u16) -> io::Result<Self> {
        let loopback = Ipv4Addr::new(127, 0, 0, 1);
        let socket = UdpSocket::bind(SocketAddrV4::new(loopback, port))?;

        let inner: Arc<Mutex<TelemetryReceiverInner>> = TelemetryReceiverInner {
            buffer: Vec::with_capacity(max_buffer_size.into()),
            message_number: -1,
        }
        .pipe(Mutex::new)
        .pipe(Arc::new);

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
                guard.message_number += 1;
                if guard.buffer.len() < max_buffer_size.into() {
                    guard.buffer.push(message);
                } else {
                    let message_number = guard.message_number;
                    guard.buffer[(message_number % max_buffer_size.az::<i64>()).az::<usize>()] =
                        message;
                }
            }
        });

        Ok(TelemetryReceiver {
            inner: inner_clone,
            max_buffer_size: max_buffer_size.into(),
        })
    }

    /// Gets all messages since `prev_msg_number`. Messages are returned in `buf`, whose contents are
    /// cleared beforehand. Returns a tuple with the first item being the current message number,
    /// which should be passed to this method the next time it's called, and the second item being
    /// whether some messages were skipped due to `prev_msg_number` being too old.
    pub fn get_pending(&self, buf: &mut Vec<Message>, prev_msg_number: i64) -> (i64, bool) {
        buf.clear();
        let guard = self.inner.lock();
        let num_messages_since = guard.message_number - prev_msg_number;
        let missed_msgs = num_messages_since > self.max_buffer_size;

        let num_msgs_to_return = cmp::min(num_messages_since, self.max_buffer_size);
        if num_msgs_to_return < 1 {
            return (guard.message_number, missed_msgs);
        }

        let current_msg_idx = guard.message_number % self.max_buffer_size;
        let first_msg_to_return_idx =
            (guard.message_number - num_msgs_to_return + 1) % self.max_buffer_size;

        if first_msg_to_return_idx < current_msg_idx {
            buf.extend_from_slice(
                &guard.buffer
                    [first_msg_to_return_idx.az::<usize>()..=current_msg_idx.az::<usize>()],
            );
        } else {
            buf.extend_from_slice(&guard.buffer[first_msg_to_return_idx.az::<usize>()..]);
            buf.extend_from_slice(&guard.buffer[0..=current_msg_idx.az::<usize>()]);
        }

        (guard.message_number, missed_msgs)
    }
}

#[derive(Debug)]
struct TelemetryReceiverInner {
    buffer: Vec<Message>,
    message_number: i64,
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
