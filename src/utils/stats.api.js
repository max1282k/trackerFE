import { useQuery } from "@tanstack/react-query";
import { client } from "./api-client";


export const useGetStats = () =>
  useQuery(["getStats"], async () => {
    const response = await client("admin/getStats");
    return response;
  });
