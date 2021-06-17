// TODO: Jump, Wing Open/Close, Reset
// TODO: Fix rotations being inverted when flying

import * as React from "react";
import {
  ChakraProvider,
  Grid,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { theme } from "./theme";
import { DigitalIndicator } from "./components/DigitalIndicator";
import { TelemetryTable } from "./components/TelemetryTable";
import { ControlStick } from "./components/ControlStick";
import { getTelemetry, Telemetry } from "./telemetry/telemetry";

const animate = (setTelemetry: (x: Telemetry) => void) => {
  getTelemetry().then((response) => {
    if (response != null) {
      setTelemetry(response);
    }
  });

  requestAnimationFrame(() => animate(setTelemetry));
};

export const App = () => {
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => animate(setTelemetry));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {telemetry ? (
        <>
          {/*<TelemetryTable telemetry={telemetry} />*/}
          <HStack p={2}>
            <ControlStick
              x={telemetry.CarDirectives.steer}
              y={telemetry.WingsOpen ? -telemetry.CarDirectives.rotationX : 0}
            />
            <VStack>
              <Grid
                templateColumns="repeat(2, 1fr)"
                gap={1}
                justifyItems="stretch"
              >
                <DigitalIndicator
                  text="Boost"
                  state={telemetry.CarDirectives.boost}
                />
                <DigitalIndicator
                  text="Grip"
                  state={telemetry.CarDirectives.grip}
                />
                <DigitalIndicator text="Wings" state={telemetry.WingsOpen} />
                <DigitalIndicator
                  text="Jump"
                  state={telemetry.JumpTimer < 0.1}
                />
              </Grid>
              <Slider
                size="lg"
                isReadOnly={true}
                focusThumbOnChange={false}
                max={1}
                value={telemetry.CarDirectives.brake}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </VStack>
            <Slider
              orientation="vertical"
              size="lg"
              isReadOnly={true}
              focusThumbOnChange={false}
              min={-1}
              max={1}
              value={telemetry.CarDirectives.gas}
              h="auto"
              alignSelf="stretch"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <ControlStick
              x={
                telemetry.WingsOpen
                  ? -telemetry.CarDirectives.rotationZ
                  : telemetry.CarDirectives.rotationZ
              }
              y={telemetry.WingsOpen ? 0 : telemetry.CarDirectives.rotationX}
            />
          </HStack>
        </>
      ) : (
        <Text>No telemetry</Text>
      )}
    </ChakraProvider>
  );
};
