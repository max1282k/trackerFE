import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";


export const useGetAllOrganizations = ({limit, offset}) =>
  useQuery(["getAllOrganizations", offset, limit], async () => {
    const response = await client(`organization/getAllOrganizations?offset=${offset}&limit=${limit}`);
    return response;
  });

  export const useCreateOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation(
      async (payload) => {
        const response = await client("organization/createOrganization", {
          method: "POST",
          data: payload
        });
        return response;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getAllOrganizations"]);
        },
      }
    );
  };

  export const useDeleteOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation(
      async (payload) => {
        const response = await client("organization/deleteOrganization", {
          method: "POST",
          data: payload
        });
        return response;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getAllOrganizations"]);
        },
      }
    );
  };
  
