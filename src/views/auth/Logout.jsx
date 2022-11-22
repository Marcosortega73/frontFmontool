import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/inicio",{ replace: true });
        window.location.reload();
      })
      .catch((e) => {
        console.log("Error",e);
      });
  };

  React.useEffect(() => {
    handleLogout();
    }, []);
};

export default Logout;
