use serde::{Deserialize, Serialize};

#[derive(Debug, Copy, Clone, Default, PartialEq, PartialOrd, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CarDirectives {
    steer: f32,
    rotation_x: f32,
    rotation_y: f32,
    rotation_z: f32,
    gas: f32,
    brake: f32,
    boost: bool,
    grip: bool,
}

impl CarDirectives {
    pub fn from_bits(bits: i32) -> Self {
        CarDirectives {
            steer: Self::decode_f32_negative_1_to_1(bits, 0, 7),
            rotation_x: Self::decode_f32_negative_1_to_1(bits, 7, 5),
            rotation_y: Self::decode_f32_negative_1_to_1(bits, 12, 5),
            rotation_z: Self::decode_f32_negative_1_to_1(bits, 17, 5),
            gas: Self::decode_f32_negative_1_to_1(bits, 22, 4),
            brake: Self::decode_f32_0_to_1(bits, 26, 4),
            boost: Self::decode_bool(bits, 30),
            grip: Self::decode_bool(bits, 31),
        }
    }

    fn decode_f32_negative_1_to_1(bits: i32, start_bit_index: usize, bit_size: usize) -> f32 {
        let mask = (1 << bit_size) - 1;
        let field_bits = (bits >> start_bit_index) & mask;

        (field_bits as f32) / ((mask - 1) as f32) * 2.0 - 1.0
    }

    fn decode_f32_0_to_1(bits: i32, start_bit_index: usize, bit_size: usize) -> f32 {
        let mask = (1 << bit_size) - 1;
        let field_bits = (bits >> start_bit_index) & mask;

        (field_bits as f32) / (mask as f32)
    }

    fn decode_bool(bits: i32, bit_index: usize) -> bool {
        bits & (1 << bit_index) != 0
    }
}
