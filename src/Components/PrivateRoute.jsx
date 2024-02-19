import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      return navigate("/");
    }
  });

  return currentUser && children;
};

export default PrivateRoute;
