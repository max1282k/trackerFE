import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";


export const useGetAllDevices = ({limit, offset}) =>
  useQuery(["getAllDevices", limit, offset], async () => {
    const response = await client(`device/getAllDevices?offset=${offset}&limit=${limit}`);
    return response;
  });

  export const useCreateDevice = () => {
    const queryClient = useQueryClient();
    return useMutation(
      async (payload) => {
        const response = await client("device/createDevice", {
          method: "POST",
          data: payload
        });
        return response;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getAllDevices"]);
        },
      }
    );
  };

  export const useDeleteDevice = () => {
    const queryClient = useQueryClient();
    return useMutation(
      async (payload) => {
        const response = await client("device/deleteDevice", {
          method: "POST",
          data: payload
        });
        return response;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getAllDevices"]);
        },
      }
    );
  };
  
