import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type TProps = {
  isChecked: boolean;
  onChange: () => void;
};

const RadioCard = ({
  isChecked,
  onChange,
  children,
}: PropsWithChildren<TProps>) => {
  console.log(isChecked);
  return (
    <Box as="label">
      <Box
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
        onClick={() => onChange()}
        {...(isChecked && { "data-checked": true })}
      >
        {children}
      </Box>
    </Box>
  );
};

export default RadioCard;
