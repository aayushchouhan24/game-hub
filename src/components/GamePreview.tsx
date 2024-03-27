import { AspectRatio, Box, HStack, Image } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useTrailers from "../hooks/useTrailers";
import Game from "../entities/Game";
import useScreenshots from "../hooks/useScreenshots";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  game: Game;
}

function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  return (
    ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) +
    outputMin
  );
}

const GamePreview = ({ game }: Props) => {
  const { data, isLoading } = useTrailers(game.id);
  const { data: screenshots } = useScreenshots(game.id);

  const [isHovered, setIsHovered] = useState(false);
  const [currentSS, setCurrentSS] = useState(0);

  const ssCount = screenshots ? Math.min(screenshots.count, 7) : 0;

  const ss = [getCroppedImageUrl(game.background_image)];

  if (ssCount > 0 && screenshots)
    for (let index = 1; index < ssCount; index++)
      ss[index] = screenshots.results[index].image;

  const ref = useRef<HTMLVideoElement | null>(null);

  const no = Math.floor(Math.random() * (data?.count ?? 0));
  const first = data?.results[no];
  function videoHover() {
    const video = ref.current;
    if (video)
      if (first && isHovered && video.duration) {
        video.currentTime = video.duration / 2;
        var playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            video.onloadedmetadata = () => {
              video.currentTime = video.duration / 2;
              var playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch();
              }
            };
          });
        }
      } else video.pause();
  }

  function setSS(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const current = Math.round(
      mapRange(e.nativeEvent.offsetX, 0, 300, 0, ssCount - 1)
    );
    current != currentSS && setCurrentSS(Math.max(0, current));
  }

  videoHover();

  return (
    <Box
      as="div"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {first && !isLoading ? (
        <>
          <Box
            width="100%"
            position="absolute"
            overflow="hidden"
            paddingTop="56.25%"
            opacity={first && !isHovered ? "1" : "0"}
            transition={"all .3s"}
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              backgroundImage={`url(${game.background_image})`}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              zIndex="0"
            />
          </Box>

          <Image
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTI4JyBoZWlnaHQ9JzEyOCcgdmlld0JveD0nMCAwIDEyOCAxMjgnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz48Y2lyY2xlIGZpbGw9JyMxNTE1MTUnIG9wYWNpdHk9Jy42JyBjeD0nNjQnIGN5PSc2NCcgcj0nNjQnLz48cGF0aCBkPSdNODYuNzg0IDYwLjZMNTQuNTgyIDQwLjQ3M2MtLjk1Mi0uNTYyLTIuMTM0LS40NjgtMy4wMjctLjQ2OC0zLjU3IDAtMy41NTUgMi43MzUtMy41NTUgMy40Mjh2NDEuMTMyYzAgLjU4Ni0uMDE2IDMuNDI4IDMuNTU1IDMuNDI4Ljg5MyAwIDIuMDc1LjA5MyAzLjAyNy0uNDY5TDg2Ljc4MyA2Ny40YzIuNjQ0LTEuNTYgMi4xODctMy40IDIuMTg3LTMuNHMuNDU3LTEuODQxLTIuMTg2LTMuNHonIGZpbGw9JyNGRkYnIGZpbGwtcnVsZT0nbm9uemVybycvPjwvZz48L3N2Zz4="
            opacity={first && !isHovered ? "1" : "0"}
            transition={"all .3s"}
            zIndex={0}
            position="absolute"
            width={"44px"}
            bottom={"16px"}
            left={"16px"}
          />
          <AspectRatio
            opacity={first && !isHovered ? "0" : "1"}
            transition={"all .1s"}
            maxW="300px"
            ratio={16 / 9}
          >
            <video ref={ref} muted loop src={first.data[480]} />
          </AspectRatio>
        </>
      ) : (
        <Box position={"relative"}>
          <AspectRatio maxW="300px" ratio={16 / 9}>
            <Image
              width={"100%"}
              onMouseLeave={() => setCurrentSS(0)}
              onMouseMove={setSS}
              src={ss[currentSS]}
            />
          </AspectRatio>
          {ssCount > 1 && (
            <HStack
              bottom={3}
              width={"100%"}
              position={"absolute"}
              paddingX="16px"
              justifyContent={"space-evenly"}
            >
              {ss.map((_, i) => (
                <Box
                  borderRadius={100}
                  key={i}
                  width={"100%"}
                  height={1}
                  opacity={!isHovered ? "0" : "1"}
                  transition={"all .3s"}
                  bg={currentSS == i ? "#FFFFFFE1" : "#FFFFFF75"}
                />
              ))}
            </HStack>
          )}
        </Box>
      )}
    </Box>
  );
};
export default GamePreview;
