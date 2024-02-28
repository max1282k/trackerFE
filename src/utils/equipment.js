import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";

export const useGetEquipment = () =>
  useQuery(["getEquipment"], async () => {
    const response = await client(`equipment/getEquipment`);
    return response;
  });

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload) => {
      console.log(payload);
      const response = await client("equipment/createEquipment", {
        method: "POST",
        data: payload,
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getEquipment"]);
      },
    }
  );
};

export const useEditEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload) => {
      const response = await client(
        `equipment/editEquipment/${payload?.imei}`,
        {
          method: "POST",
          data: payload,
        }
      );
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getEquipment"]);
      },
    }
  );
};
