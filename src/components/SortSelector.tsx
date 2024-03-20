import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGameQueryStore from "../store";

const SortSelector = () => {
  const sortOrderObj = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-release", label: "Release date" },
    { value: "-rating", label: "Average rating" },
  ];

  const [{ sortOrder }, setSortOrder] = useGameQueryStore((s) => [
    s.gameQuery,
    s.setSortOrder,
  ]);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {"Order by: " +
          (sortOrderObj.find((order) => order.value == sortOrder)?.label ||
            "Relevance")}
      </MenuButton>
      <MenuList>
        {sortOrderObj.map((order) => (
          <MenuItem
            onClick={() => setSortOrder(order.value)}
            key={order.value}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
