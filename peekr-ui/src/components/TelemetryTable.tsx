import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import * as React from "react";
import { Telemetry } from "../telemetry/telemetry";

export const TelemetryTable = ({ telemetry }: { telemetry: Telemetry }) => {
  const directives = telemetry.CarDirectives;
  const data = [
    ["Steer", `${directives.steer.toFixed(2)}`],
    [
      "Rotation",
      `[${directives.rotationX.toFixed(2)}, ${directives.rotationY.toFixed(
        2
      )}, ${directives.rotationZ.toFixed(2)}]`,
    ],
    ["Gas", `${directives.gas.toFixed(2)}`],
    ["Brake", `${directives.brake.toFixed(2)}`],
    ["Boost", `${directives.boost.toString()}`],
    ["Grip", `${directives.grip.toString()}`],
  ];

  return (
    <Table size="sm" w={72}>
      <Thead>
        <Tr>
          <Th>Field</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((x, idx) => (
          <Tr key={idx}>
            <Td>{x[0]}</Td>
            <Td>{x[1]}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
