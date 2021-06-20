import * as React from "react";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { theme } from "./theme";
import { getTelemetry, Telemetry } from "./telemetry/telemetry";
import { DirectivesDisplay } from "./components/DirectivesDisplay";

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
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {telemetry ? (
        <DirectivesDisplay telemetry={telemetry} />
      ) : (
        <Text>No telemetry</Text>
      )}
    </ChakraProvider>
  );
};
