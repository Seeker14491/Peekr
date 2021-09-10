import { invoke } from "./tauri";
import type { CarDirectives, Telemetry } from "./telemetry";
import type { RawTelemetry } from "./get";

export const postProcessTelemetry = async (
  rawTelemetry: RawTelemetry
): Promise<Telemetry> => {
  const carDirectivesDecoded = await decodeCarDirectives(
    rawTelemetry.CarDirectivesBits
  );
  const tmp = rawTelemetry as any;
  delete tmp.CarDirectivesBits;
  const telemetry: Telemetry = tmp;
  telemetry.CarDirectives = carDirectivesDecoded;

  return telemetry;
};

const decodeCarDirectives = (bits: number): Promise<CarDirectives> => {
  return invoke("decode_car_directives", { bits });
};
