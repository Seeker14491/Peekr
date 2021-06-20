import { invoke } from "@tauri-apps/api/tauri";
import { CarDirectives, Telemetry } from "./telemetry";
import { RawTelemetry } from "./get";

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
  return invoke<CarDirectives>("decode_car_directives", { bits });
};
