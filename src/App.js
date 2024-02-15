import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "reactstrap";
import AdminInvite from "views/AdminInvite";
import { useVerifyToken } from "utils/auth.api";
import UserInvite from "views/UserInvite";
import DetailedMap from "views/examples/DetailedMap";

const App = () => {
  // const verifyTokenMutation = useVerifyToken();
  // const [isVerified, setIsVerified] = useState(false);
  // const path = localStorage.getItem('path');

  const { data: token } = useQuery(["token"], () =>
    localStorage.getItem("token")
  );

  // const verify = async ()=> {
  //   const verifiedToken = await verifyTokenMutation.mutateAsync({
  //     token: token?.slice(7),
  //   })
  //   if (verifiedToken?.decodedToken) {
  //     setIsVerified(true);
  //   }
  // }

  // useEffect(() => {
  //   verify();
  // }, [token]);

  if (token === undefined) {
    return <Spinner className="d-block mx-auto my-5" />;
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path={`/verifyAdminPage`} element={<AdminInvite />} />
        <Route path={`/verifyUserPage`} element={<UserInvite />} />
        {token && <Route path={`/detailed-map`} element={<DetailedMap />} />}
        {token ? (
          <Route path="/admin/*" element={<AdminLayout />} />
        ) : (
          <Route path="/auth/*" element={<AuthLayout />} />
        )}
        <Route
          path="*"
          element={
            token ? (
              <Navigate to={ "/admin/index"} replace />
            ) : (
              <Navigate to={"/auth/login"} replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
