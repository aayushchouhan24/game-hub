import eye from "../assets/bulls-eye.webp";
import thumb from "../assets/thumbs-up.webp";
import meh from "../assets/meh.webp";
import { Image, ImageProps } from "@chakra-ui/react";

interface Prop {
  rating: number;
}
const Emoji = ({ rating }: Prop) => {
  if (rating < 3) return null;

  const emoji: { [key: number]: ImageProps } = {
    3: { src: meh, alt: "meh", boxSize: "25px" },
    4: { src: thumb, alt: "recommended", boxSize: "25px" },
    5: { src: eye, alt: "exceptional", marginTop: 0, boxSize: "35px" },
  };

  return <Image marginTop={"10px"} {...emoji[rating-1]} />;
};

export default Emoji;
