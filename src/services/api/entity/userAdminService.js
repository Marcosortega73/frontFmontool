
import axiosHttp from "../../apiAxios";
const http = axiosHttp()
/*
    #TODO:Prueba con administradores
*/


const API_URL = "administradores";


const getUserAdminService = async ({token}) => {
    console.log("LLEGE AL USER ADMIN SERVICE")
try{
    if (token) {
    const data  =  await http
      .get(API_URL + "/dataUser", { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
            console.log("LLEGE AL LA DATA USERADMIN",response.data)
            localStorage.setItem("credentials", JSON.stringify(response.data));
            return response.data;
      });
      return data
    }
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}

const getUsersAdminService = async () => {
    console.log("LLEGE AL USER ADMIN SERVICE")
try{
  
    const data  =  await http
      .get(API_URL + "/getUsers")
      .then((response) => {
            console.log("LLEGE AL LA DATA USERADMIN",response.data)
            return response.data;
      });
      return data
    }

  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}


const usersAdminService = {
  getUserAdminService,
  getUsersAdminService,
  };

 

export default usersAdminService;