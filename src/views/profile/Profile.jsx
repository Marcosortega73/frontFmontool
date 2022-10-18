import React from "react";
import { useSelector } from "react-redux";
import DrawerComponent from "./components/DrawerComponent";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
//dispatch
import { useDispatch } from "react-redux";
import { getRegiones } from "../../redux/regionesSlice";
import { Box } from "@mui/material";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userLogged, setUserLogged] = React.useState(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/profile/mis-datos");
    dispatch(getRegiones());
  }, []);

  React.useEffect(() => {
    setUserLogged(user);
  }, [user, dispatch]);

  return (
    <>
    
      <Box sx={{px:0}} className="poraasque">
        <DrawerComponent user={userLogged} />
      </Box>
    </>
  );
};

export default Profile;
