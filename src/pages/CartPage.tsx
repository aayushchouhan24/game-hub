import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import useFirebase from "../hooks/useFirebase";
import useUserStore from "../stores/UserStore";
import getCroppedImageUrl from "../services/image-url";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import CartMoneyText from "../components/CartMoneyText";

interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
  publisher?: string;
}
const CartPage = () => {
  const user = useUserStore((s) => s.user);
  const path = `Users/${user?.uid}/cart`;
  const { snapshot, isLoading, deleteValue } = useFirebase(path);

  if (!user) useNavigate()("/");

  if (!isLoading && snapshot) {
    if (snapshot.size) {
      const cart = Object.values(snapshot.val()) as Item[];
      return (
        <>
          <Center gap={10}>
            <VStack
              height={"80vh"}
              overflowY={"scroll"}
              className="custom-scrollbar"
            >
              {cart.map((item) => (
                <Card
                  flexDirection={"row"}
                  margin={2}
                  width={"500px"}
                  key={item.id}
                  borderRadius={7}
                >
                  <Image
                    width={150}
                    borderRadius={7}
                    objectFit="cover"
                    src={getCroppedImageUrl(item.image)}
                  ></Image>
                  <CardBody>
                    <HStack justifyContent={"space-between"}>
                      <VStack width={"100%"} alignItems={"flex-start"}>
                        <HStack
                          width={"100%"}
                          alignItems={"flex-end"}
                          justifyContent={"space-between"}
                        >
                          <Text fontWeight={"bold"} fontSize={12}>
                            Publisher - {item.publisher}
                          </Text>
                          <Box
                            onClick={() => deleteValue(path + "/" + item.id)}
                            _hover={{
                              color: "red",
                            }}
                          >
                            <TbTrash />
                          </Box>
                        </HStack>

                        <HStack
                          width={"100%"}
                          alignItems={"flex-end"}
                          justifyContent={"space-between"}
                        >
                          <Heading marginTop={1} fontSize={24}>
                            {item.name.substring(0, 20) +
                              (item.name.length > 20 ? "..." : "")}
                          </Heading>
                          <Text fontWeight={"bold"}> ₹ {item.price}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
            <VStack>
              <Box
                padding={5}
                height={"80vh"}
                width={"400px"}
                backgroundColor={"#202020"}
                justifyContent={"space-between"}
                display={"flex"}
                flexDirection={"column"}
              >
                <Box>
                  <Text fontWeight={"bold"} fontFamily={"cursive"}>
                    PRICE DETAILS ({snapshot.size} Item)
                  </Text>
                  <CartMoneyText
                    left="Total MRP"
                    right={`₹ ${cart.reduce(
                      (acc, item) => acc + item.price,
                      0
                    )}`}
                  />
                  <CartMoneyText
                    left="Discount on MRP"
                    right={``}
                    colorRight="green"
                  />
                  <CartMoneyText
                    left="Coupon Discount"
                    right={`- ₹ ${snapshot.size - 1}`}
                    colorRight="green"
                  />
                  <CartMoneyText
                    left="Platform Fee"
                    right={`FREE`}
                    colorRight="green"
                  />
                  <CartMoneyText
                    left="Shipping Fee"
                    right={`FREE`}
                    colorRight="green"
                    colorOff="white"
                    off={"₹98"}
                  />
                  <Divider marginTop={5} />
                  <CartMoneyText
                    left="Total Amount"
                    right={`₹ ${
                      cart.reduce((acc, item) => acc + item.price, 0) -
                      (snapshot.size - 1)
                    }`}
                  />
                </Box>
                <Button>PLACE ORDER</Button>
              </Box>
            </VStack>
          </Center>
        </>
      );
    } else return <Center height={"70vh"}>Cart is Empty.</Center>;
  } else return <Spinner />;
};
export default CartPage;
