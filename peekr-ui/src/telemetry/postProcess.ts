import { invoke } from "@tauri-apps/api/tauri";
import { CarDirectives, Telemetry } from "./telemetry";
import { RawTelemetry } from "./get";

export const postProcessTelemetry = async (
  rawTelemetry: RawTelemetry
): Promise<Telemetry> => {
  const carDirectivesDecoded = await decodeCarDirectives(
    rawTelemetry.CarDirectivesBits
  );
  delete rawTelemetry.CarDirectivesBits;
  const telemetry: Telemetry = rawTelemetry as any;
  telemetry.CarDirectives = carDirectivesDecoded;

  return telemetry;
};

const decodeCarDirectives = (bits: number): Promise<CarDirectives> => {
  return invoke<CarDirectives>("decode_car_directives", { bits });
};
