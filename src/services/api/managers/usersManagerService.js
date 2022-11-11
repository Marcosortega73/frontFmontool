
import axiosHttp from "../../apiAxios";
const http = axiosHttp()

const API_URL = "managers";


const getManagersService = async () => {
try{
   
    const data  =  await http
      .get(API_URL + "/obtenerManagers")
      .then((response) => {
            return response.data;
      });
      console.log("DATA MANAGERS", data)
      return data
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}

const getManagers = async () => {
  try{

    const data  =  await http
      .get(API_URL + "/getManagers")
      .then((response) => {
            return response.data.data;
      });
      console.log("DATA MANAGERS", data)
      return data

  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}

 
const usersManagersService = {
    getManagersService,
    getManagers,
}

export default usersManagersService;