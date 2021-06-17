import { theme } from "../theme";
import { Text } from "@chakra-ui/react";
import * as React from "react";

export const DigitalIndicator = ({
  text,
  state,
}: {
  text: string;
  state: boolean;
}) => {
  const bgColor = state ? theme.colors.gray[600] : null;

  return (
    <Text
      borderWidth={1}
      borderColor="gray.600"
      bgColor={bgColor}
      p={1}
      textAlign="center"
    >
      {text}
    </Text>
  );
};
