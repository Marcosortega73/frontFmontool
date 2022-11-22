
import axiosHttp from "../../apiAxios";
const http = axiosHttp()



const API_URL = "download/";

const downloadPlantillaService = async (formData) => {
    console.log("LLEGE AL UPLOAD JUGADOR REQ")
try{

    const response  =  http
      .get(API_URL +"download/"+ formData,
      {
        responseType: 'blob',
        })
        
      .then((res) => {
            return res.data;
      });
      return response
    }
      catch (error) {
    console.log("LLEGE AL ERROR UPLOAD",error)
  };

  }


const downloadsService = {

  downloadPlantillaService,

    


}

export default downloadsService