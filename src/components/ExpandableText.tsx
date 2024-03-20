import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
  limit?: number;
}

const ExpandableText = ({ children, limit = 300 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  if (!children) return null;
  if (children.length <= limit) return <Text>{children}</Text>;

  const summary = !expanded ? children.substring(0, limit) : children;

  return (
    <Text>
      {summary}...{" "}
      <Button
        size={"xs"}
        marginLeft={1}
        fontWeight={"bold"}
        colorScheme="yellow"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </Text>
  );
};
export default ExpandableText;
