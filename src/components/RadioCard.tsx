import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const RadioCard = (props: PropsWithChildren<UseRadioProps>) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        py={1}
        px={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
