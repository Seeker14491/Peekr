import { Telemetry } from "../telemetry/telemetry";
import { ControlStick } from "./ControlStick";
import {
  Box,
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
  <HStack p={3} alignItems="center">
    <ControlStick
      x={telemetry.CarDirectives.steer}
      y={telemetry.WingsOpen ? -telemetry.CarDirectives.rotationX : 0}
    />
    <VStack alignItems="stretch">
      <Grid templateColumns="repeat(2, 1fr)" gap={1} justifyItems="stretch">
        <DigitalIndicator text="Jump" state={telemetry.JumpTimer < 0.1} />
        <DigitalIndicator text="Boost" state={telemetry.CarDirectives.boost} />
        <DigitalIndicator text="Wings" state={telemetry.WingsOpen} />
        <DigitalIndicator text="Grip" state={telemetry.CarDirectives.grip} />
      </Grid>
      <HStack>
        <Text fontSize="sm">Brake:</Text>
        <Slider
          transform="scaleY(3)"
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
    <Box alignSelf="stretch">
      <VStack h="100%" spacing="px">
        <Text fontSize="sm">Gas:</Text>
        <Slider
          transform="scaleX(3)"
          orientation="vertical"
          size="lg"
          isReadOnly={true}
          focusThumbOnChange={false}
          min={0}
          max={1}
          value={telemetry.CarDirectives.gas}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
        <Slider
          transform="scaleX(3) rotate(180deg)"
          orientation="vertical"
          size="lg"
          isReadOnly={true}
          focusThumbOnChange={false}
          min={0}
          max={1}
          value={-telemetry.CarDirectives.gas}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
      </VStack>
    </Box>
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
