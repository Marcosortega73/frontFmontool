import axiosHttp from "../../apiAxios";

const http = axiosHttp();

const API_URL = "reuniones/";
const getReunionesService = async (data) => {
  console.log("LLEGE AL GET reuniones REQ", data);
  try {
    const response = http.post(API_URL + "obtenerItems",data).then((res) => {
      console.log("LLEGE AL LA DATA GET Season", res.data);
      return res.data?.reunionesByFecha
      ;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }
};


const createReunionesService = async (data) => {
  console.log("LLEGE AL GET reuniones REQ", data);
  try {
    const response = http.post(API_URL + "create",data).then((res) => {
      console.log("LLEGE AL LA DATA GET create reunion", res.data);
      return res.data;
      
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }
};

const reunionesService = {
  getReunionesService,
  createReunionesService
};

export default reunionesService;
