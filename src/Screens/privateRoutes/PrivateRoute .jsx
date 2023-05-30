import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated }) => {
  const tokenStorage = localStorage.getItem("accessToken");
  useEffect(() => {
    console.log("privateRoute", tokenStorage);
  }, []);

  return (
    <>{tokenStorage ? <Component /> : <Navigate to={{ pathname: "/" }} />}</>
  );
};

export default PrivateRoute;
