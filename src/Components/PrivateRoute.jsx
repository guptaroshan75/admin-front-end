import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, currentUser }) => {
  useEffect(() => {
    if (!currentUser) {
      return navigate("/");
    }
  }, );
  const navigate = useNavigate();

  return currentUser && children;
};

export default PrivateRoute;
