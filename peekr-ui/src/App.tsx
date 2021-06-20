import * as React from "react";
import { Box, ChakraProvider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { theme } from "./theme";
import { getTelemetry, Telemetry } from "./telemetry/telemetry";
import { DirectivesDisplay } from "./components/DirectivesDisplay";
import { window } from "@tauri-apps/api/bundle";
import { LogicalSize } from "@tauri-apps/api/window";

const animate = (setTelemetry: (x: Telemetry) => void) => {
  getTelemetry().then((response) => {
    if (response != null) {
      setTelemetry(response);
    }

    requestAnimationFrame(() => animate(setTelemetry));
  });
};

export const App = () => {
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => animate(setTelemetry));

    const resizeObserver = new ResizeObserver((entries) => {
      const {
        inlineSize,
        blockSize,
      }: { inlineSize: number; blockSize: number } =
        entries[0].borderBoxSize[0];
      window.appWindow.setSize(
        new LogicalSize(
          Math.max(Math.ceil(inlineSize), 200),
          Math.ceil(blockSize)
        )
      );
    });

    const resizeObserverElement = document.getElementById(
      "resize-observer-element"
    );

    if (resizeObserverElement != null) {
      resizeObserver.observe(resizeObserverElement);
    } else {
      throw new Error("resize observer element not found");
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box id="resize-observer-element" w="min-content">
        {telemetry ? (
          <DirectivesDisplay telemetry={telemetry} />
        ) : (
          <Box w="max-content" p={2}>
            <Text>No data received yet</Text>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};
