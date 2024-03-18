import { Badge } from "@chakra-ui/react";

const CriticScore = ({ score }: { score: number }) => {
  const color = score > 75 ? "green" : score > 60 ? "yellow" : "red";
  return (
    <Badge colorScheme={color} fontSize={"14px"} paddingX={2} borderRadius={4}>
      {score}
    </Badge>
  );
};

export default CriticScore;
