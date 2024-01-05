import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";

export const useGetAllUser = ({ page, size }) =>
  useQuery(["getAllUser"], async () => {
    const response = await client(
      `dashboard/getAllUser?page=${page}&size=${size}`
    );
    return response;
  });

export const useSuspendUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload) => {
      try {
        const response = await client(`dashboard/SuspendUser`, {
          method: "POST",
          data: payload,
        });
        return response;
      } catch (error) {
        throw new Error(`Error while suspending user: ${error.message}`);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllUser"]);
      },
    }
  );
};
