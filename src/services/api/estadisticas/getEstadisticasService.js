import axiosHttp from "../../apiAxios";

const http = axiosHttp();

const API_URL = "estadisticas/";

//getAsistenciasByTorneo

const getEstadisticasByTorneo = async (data) => {
  console.log("LLEGE AL GET Estadisticas REQ");
  try {
    const response = http.get(API_URL + "obtenerEstadisticas/"+data.torneo+`?estadistica_id=${data.tipo}`).then((res) => {
      console.log("LLEGE AL LA DATA GET Estadisitica", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }
};

const getSancionadosByTorneoEquipo = async (data) => {
  console.log("LLEGE AL GET Sancionados REQ");
  try {
    const response = http.get(API_URL + "obtenerSancionados/"+data.equipo_id+`?torneo_id=${data.torneo_id}`).then((res) => {
      console.log("LLEGE AL LA DATA GET Sancionados", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }

};

const getEstadisticasByEquipo = async (data) => {
  console.log("LLEGE AL GET Estadisticas REQ");
  try {
    const response = http.get(API_URL + "obtenerEstadisticas/"+data.equipo+`?torneo_id=${data.torneo}`).then((res) => {
      console.log("LLEGE AL LA DATA GET Estadisitica", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }
};

const getAllEstadisticas = async () => {
  console.log("LLEGE AL GET Estadisticas REQ");
  try {
    const response = http.get(API_URL + "obtenerEstadisticas").then((res) => {
      console.log("LLEGE AL LA DATA GET Estadisitica", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }
};



  

const getEstadisticasServices = {
  getEstadisticasByTorneo,
  getSancionadosByTorneoEquipo,
  getEstadisticasByEquipo,
  getAllEstadisticas

};

export default getEstadisticasServices;
