import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Game from "../entities/Game";

const apiClint = new APIClient<Game>("/games");


const useGame = (slug: string) =>
  useQuery({
    queryKey: ["games", slug],
    queryFn: () => apiClint.get(slug),
  });

export default useGame;
