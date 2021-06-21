import { Telemetry } from "../telemetry/telemetry";
import { ControlStick } from "./ControlStick";
import {
  Grid,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DigitalIndicator } from "./DigitalIndicator";
import * as React from "react";

export const DirectivesDisplay = ({ telemetry }: { telemetry: Telemetry }) => (
  <HStack p={4} alignItems="stretch">
    <ControlStick
      x={telemetry.CarDirectives.steer}
      y={telemetry.WingsOpen ? -telemetry.CarDirectives.rotationX : 0}
    />
    <VStack alignItems="stretch">
      <Grid templateColumns="repeat(2, 1fr)" gap={1} justifyItems="stretch">
        <DigitalIndicator text="Boost" state={telemetry.CarDirectives.boost} />
        <DigitalIndicator text="Grip" state={telemetry.CarDirectives.grip} />
        <DigitalIndicator text="Wings" state={telemetry.WingsOpen} />
        <DigitalIndicator text="Jump" state={telemetry.JumpTimer < 0.1} />
      </Grid>
      <HStack>
        <Text fontSize="sm">Brake:</Text>
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
        </Slider>
      </HStack>
    </VStack>
    <VStack>
      <Text fontSize="sm">Gas:</Text>
      <Slider
        orientation="vertical"
        size="lg"
        isReadOnly={true}
        focusThumbOnChange={false}
        min={-1}
        max={1}
        value={telemetry.CarDirectives.gas}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
      </Slider>
    </VStack>
    <ControlStick
      x={
        telemetry.WingsOpen
          ? -telemetry.CarDirectives.rotationZ
          : telemetry.CarDirectives.rotationZ
      }
      y={telemetry.WingsOpen ? 0 : telemetry.CarDirectives.rotationX}
    />
  </HStack>
);
