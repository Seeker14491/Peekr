import type { RawTelemetry } from "./get";
import { pollTelemetry } from "./get";
import { postProcessTelemetry } from "./postProcess";

export interface Telemetry extends Omit<RawTelemetry, "CarDirectivesBits"> {
  CarDirectives: CarDirectives;
}

export interface CarDirectives {
  steer: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  gas: number;
  brake: number;
  boost: boolean;
  grip: boolean;
}

export const getTelemetry = async (): Promise<Telemetry | null> => {
  const rawTelemetry = await pollTelemetry();
  if (rawTelemetry == null) {
    return null;
  }

  return postProcessTelemetry(rawTelemetry);
};
