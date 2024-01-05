import { useMutation } from "@tanstack/react-query";
import { client } from "./api-client";


  export const useCreateAdmin = () => {
    return useMutation(
      async (payload) => {
        const response = await client("admin/createAdmin", {
          method: "POST",
          data: payload
        });
        return response;
      }
    );
  };

  export const useDeleteAdmin = () => {
    return useMutation(
      async (payload) => {
        const response = await client("admin/deleteAdmin", {
          method: "POST",
          data: payload
        });
        return response;
      }
    );
  };

  export const useVerifyAdmin = () => {
    return useMutation(
      async (payload) => {
        const response = await client("admin/verifyAdmin", {
          method: "POST",
          data: payload
        });
        return response;
      }
    );
  };

  export const useCreateVerifiedAdmin = () => {
    return useMutation(
      async (payload) => {
        const response = await client("admin/createVerifiedAdmin", {
          method: "POST",
          data: payload
        });
        return response;
      }
    );
  };
  
