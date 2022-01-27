import type { CarDirectives, Telemetry } from "./telemetry";
import type { RawTelemetry } from "./get";
import { invoke } from "@tauri-apps/api/tauri";

export const postProcessTelemetry = async (
  rawTelemetry: RawTelemetry
): Promise<Telemetry> => {
  const carDirectivesDecoded = await decodeCarDirectives(
    rawTelemetry.CarDirectivesBits
  );
  const { CarDirectivesBits: _, ...data } = rawTelemetry;
  return { CarDirectives: carDirectivesDecoded, ...data };
};

const decodeCarDirectives = (bits: number): Promise<CarDirectives> => {
  return invoke("decode_car_directives", { bits });
};
