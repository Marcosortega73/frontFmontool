import axiosHttp from "../../apiAxios";

const http = axiosHttp();

const API_URL = "estadisticas/";
const getGoleadoresByTorneo = async (id) => {
  console.log("LLEGE AL GET Estadisticas REQ");
  try {
    const response = http.get(API_URL + "obtenerGoleadores/"+id).then((res) => {
      console.log("LLEGE AL LA DATA GET Estadisitica", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }
};






const getEstadisticasServices = {
  getGoleadoresByTorneo,

};

export default getEstadisticasServices;
