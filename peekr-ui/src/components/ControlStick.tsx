import React from "react";
import { Box } from "@chakra-ui/react";

const backdropSize = 80;
const stickSize = 56;
const stickMotionFactor = 0.25;

export const ControlStick = ({ x, y }: { x: number; y: number }) => {
  const stickCenterOffset = (backdropSize - stickSize) / 2;
  const stickOffsets = [
    stickCenterOffset + x * backdropSize * stickMotionFactor,
    stickCenterOffset + y * backdropSize * stickMotionFactor,
  ];

  return (
    <>
      <Box
        w={`${backdropSize}px`}
        h={`${backdropSize}px`}
        borderRadius="100%"
        bgColor="gray.700"
      >
        <Box
          w={`${stickSize}px`}
          h={`${stickSize}px`}
          position="relative"
          left={`${stickOffsets[0]}px`}
          top={`${stickOffsets[1]}px`}
          borderRadius="100%"
          bgColor="gray.500"
        />
      </Box>
    </>
  );
};
