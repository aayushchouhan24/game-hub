import {
  Card,
  CardBody,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card height={310} width="300px" borderRadius={10} overflow={"hidden"}>
      <Skeleton height="170px" />
      <CardBody>
        <HStack marginBottom={4} justifyContent={"space-between"}>
          <HStack marginY={1}>
            <SkeletonCircle size="5" />
            <SkeletonCircle size="5" />
            <SkeletonCircle size="5" />
            <SkeletonCircle size="5" />
          </HStack>
          <Skeleton width={7} borderRadius={4} height={5} />
        </HStack>
        <SkeletonText noOfLines={2} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
