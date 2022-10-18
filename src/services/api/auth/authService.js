

import Swal from "sweetalert2";

import axiosHttp from "../../apiAxios";
const http = axiosHttp()

const API_URL = "userPending/";

const login = async (userData) => {
  try {
    const data = await http
      .post(API_URL + "login", userData)
      .then((response) => {
        if (response.data?.permissions?.token) {
          console.log("LLEGE AL LOGIN", response.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem("permissions", JSON.stringify(response.data.permissions));
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    console.log("DATA DEL LOGIN Service", data);
    return data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal!",
    });
    console.log("LLEGE AL ERROR del login", error);
  }
};
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("credentials");
};

const getUpdatedUser = async () => {
  console.log("LLEGE Data User");
  try {
   
      const data = await http
        .get(API_URL + "/dataUser")
        .then((response) => {
          console.log("LLEGE AL LA DATA USERADMIN", response.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          return response.data;
        });
      return data;
    
  } catch (error) {
    console.log("LLEGE AL ERROR", error);
  }
};

//getUpdatedUser
const authService = {
  login,
  logout,
  getUpdatedUser,
};

export default authService;
