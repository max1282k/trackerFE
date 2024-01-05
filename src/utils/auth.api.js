import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";

let token;

export const useAdminLogin = () => {
  const queryClient = useQueryClient();
  const login = async (loginData) => {
    const response = await client("auth/adminLogin", {
      method: "POST",
      data: loginData,
    });

    if (response.error) {
      throw new Error(response.error);
    }
    if (response?.token) {
      localStorage.setItem("token", response.token);
      queryClient.invalidateQueries("token");
      return response;
    } else {
      throw new Error("Unexpected response from the server");
    }
  };
  return useMutation(login);
};

export const useVerifyToken = () => {
  return useMutation(async (payload) => {
    const response = await client("auth/verifyToken", {
      method: "POST",
      data: payload,
    });
    return response;
  });
};

export const useAdminRegisteration = () => {
  const register = async (registerData) => {
    const response = await client("auth/adminRegistration", {
      method: "POST",
      data: registerData,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    if (response?.admin?.role) {
      console.log("Admin Registered!!!");
      return response;
    } else {
      throw new Error("Unexpected response from the server");
    }
  };

  return useMutation(register);
};

export const useDeleteAdminRegisteration = () => {
  const queryClient = useQueryClient();

  const register = async (registerData) => {
    const response = await client("auth/deleteAdminRegistration", {
      method: "POST",
      data: registerData,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    if (response?.role) {
      queryClient.invalidateQueries(["getAllUsers"]);
      queryClient.invalidateQueries(["getAllAdmins"]);
      return response;
    } else {
      throw new Error("Unexpected response from the server");
    }
  };

  return useMutation(register);
};

export const useGetAllAdmins = ({limit, offset}) => {
  return useQuery(["getAllAdmins",  limit, offset], async () => {
    const response = await client(`auth/getAllAdmins?offset=${offset}&limit=${limit}`);
    return response;
  });
};

export const useGetAdminsByOrganization = ({limit, offset}) => {
  const queryClient = useQueryClient();

  const register = async (registerData) => {
    const response = await client(`auth/getAdminsByOrganization?offset=${offset}&limit=${limit}`, {
      method: "POST",
      data: registerData,
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    if (response) {
      return response;
    } else {
      throw new Error("Unexpected response from the server");
    }
  };

  return useMutation(register);

}

  export const useGetUsersByOrganization = ({limit, offset}) => {
    const queryClient = useQueryClient();
  
    const register = async (registerData) => {
      const response = await client(`auth/getUsersByOrganization?offset=${offset}&limit=${limit}`, {
        method: "POST",
        data: registerData,
      });
      if (response?.error) {
        throw new Error(response.error);
      }
      if (response) {
        return response;
      } else {
        throw new Error("Unexpected response from the server");
      }
    };

  return useMutation(register);
};

// export const useGetAdminsByOrganization = () => {
//   return useQuery(["getAdminsByOrganization"], async () => {
//     const response = await client(
//       `auth/getAdminsByOrganization`
//     );
//     return response;
//   });
// };

export const useGetAllUsers = ({limit, offset}) => {
  return useQuery(["getAllUsers",  limit, offset], async () => {
    const response = await client(`auth/getAllUsers?offset=${offset}&limit=${limit}`);
    return response;
  });
};

export const useGetLogedInUser = () => {
  return useQuery(["getLogedInUser"], async () => {
    const response = await client(`auth/getLogedInUser`);
    return response.user;
  });
};
