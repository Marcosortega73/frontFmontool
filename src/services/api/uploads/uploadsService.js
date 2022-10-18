
import axiosHttp from "../../apiAxios";
const http = axiosHttp()



const API_URL = "uploads/";

const uploadJugadoresService = async (formData) => {
    console.log("LLEGE AL UPLOAD JUGADOR REQ")
try{

    const response  =  http
      .post(API_URL +"jugadores", formData)
      .then((res) => {
            return res.data;
      });
      return response
    }
      catch (error) {
    console.log("LLEGE AL ERROR UPLOAD",error)
  };

  }

  const uploadEquiposService = async (formData) => {
    console.log("LLEGE AL UPLOAD EQUIPOS REQ")
try{

    const response  =  http
      .post(API_URL +"equipos", formData)
      .then((res) => {
            return res.data;
      });
      return response
    }
      catch (error) {
    console.log("LLEGE AL ERROR UPLOAD",error)
  };

  }


 

const jugadoresServices = {

    uploadJugadoresService,
    uploadEquiposService
    


}

export default jugadoresServices