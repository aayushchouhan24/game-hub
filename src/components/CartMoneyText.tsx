import { HStack, Text } from "@chakra-ui/react";

interface Props {
  left: string;
  right: string;
  off?: string;
  colorLeft?: string;
  colorRight?: string;
  colorOff?: string;
  fontWeight?: string;
}

const CartMoneyText = ({
  off,
  colorOff,
  fontWeight,
  colorLeft,
  left,
  colorRight,
  right,
}: Props) => {
  return (
    <HStack marginTop={3} justifyContent={"space-between"}>
      <Text fontWeight={fontWeight} color={colorLeft} fontFamily={"cursive"}>
        {left}
      </Text>
      <Text
        fontWeight={fontWeight}
        display="flex"
        color={colorRight}
        fontFamily={"cursive"}
      >
        <Text as={'span'} color={colorOff} textDecoration={"line-through"} marginEnd={2}>
          {off}
        </Text>
        {right}
      </Text>
    </HStack>
  );
};
export default CartMoneyText;
