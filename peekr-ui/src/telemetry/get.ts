import { invoke } from "@tauri-apps/api/tauri";
import { Record, Number, Boolean, Static } from "runtypes";

const rawTelemetryT = Record({
  CarDirectivesBits: Number,
  JumpTimer: Number,
  WingsOpen: Boolean,
});

export type RawTelemetry = Static<typeof rawTelemetryT>;

export const pollTelemetry = async (): Promise<RawTelemetry | null> => {
  const jsonString = await invoke<string | null>("poll_telemetry");

  if (jsonString == null) {
    return null;
  }

  const telemetry = JSON.parse(jsonString);
  if (rawTelemetryT.guard(telemetry)) {
    return telemetry;
  } else {
    throw new Error("received invalid telemetry");
  }
};
