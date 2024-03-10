import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";

export const useGetEquipment = (refetchInterval) =>
  useQuery(["getEquipment"], async () => {
    const response = await client(`equipment/getEquipment`);
    return response;
  }, {
    // Set the refetch interval dynamically
    refetchInterval,
  });

export const useGetEquipmentById = (id) =>
  useQuery(["getEquipmentById", id], async () => {
    const response = await client(`equipment/getEquipmentById/${id}`);
    return response;
  });

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload) => {
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
