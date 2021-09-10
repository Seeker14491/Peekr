import { invoke } from "./tauri";
import { Codec, number, boolean, GetType } from "purify-ts";

const RawTelemetry = Codec.interface({
  CarDirectivesBits: number,
  JumpTimer: number,
  WingsOpen: boolean,
});

export type RawTelemetry = GetType<typeof RawTelemetry>;

export const pollTelemetry = async (): Promise<RawTelemetry | null> => {
  const jsonString = await invoke("poll_telemetry");

  if (jsonString == null) {
    return null;
  }

  const telemetry = JSON.parse(jsonString);
  return RawTelemetry.unsafeDecode(telemetry);
};
