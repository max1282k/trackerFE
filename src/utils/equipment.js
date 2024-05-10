import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";

export const useGetEquipment = (refetchInterval) =>
  useQuery(
    ["getEquipment"],
    async () => {
      const response = await client(`equipment/getEquipment`);
      return response;
    },
    {
      refetchInterval,
    }
  );

export const useGetEquipmentById = (id) =>
  useQuery(
    ["getEquipmentById", id],
    async () => {
      const response = await client(`equipment/getEquipmentById/${id}`);
      return response;
    },
    {
      refetchInterval: 30000,
    }
  );

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
    async ({ formData, id }) => {
      const response = await client(`equipment/editEquipment/${id}`, {
        method: "POST",
        data: formData,
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

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload) => {
      const response = await client("equipment/deleteEquipment", {
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

export const useGetEquipmentCounts = () =>
  useQuery(["getEquipmentCounts"], async () => {
    const response = await client(`equipment/getEquipmentCounts`);
    return response;
  });
