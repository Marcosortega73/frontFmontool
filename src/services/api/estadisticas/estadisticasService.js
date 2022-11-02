import axiosHttp from "../../apiAxios";

const http = axiosHttp();

const API_URL = "estadisticas/";
const getEstadisticasService = async () => {
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

const cargarRojasService = async (data) => {
  console.log("LLEGE AL CREATE Estadisitica REQ", data);
  try {
    const response = http.post(API_URL + "cargarRojas", data).then((res) => {
      console.log("LLEGE AL LA DATA CREATE Estadisitica", res);
      return res;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR CREATE", error);
  }
};

const cargarAmarillasService = async (data) => {
  console.log("LLEGE AL CREATE Estadisitica REQ", data);
  try {
    const response = http.post(API_URL + "cargarAmarillas", data).then((res) => {
      console.log("LLEGE AL LA DATA CREATE Estadisitica", res);
      return res;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR CREATE", error);
  }
};

const cargarLesionRojaService = async (data) => {
  console.log("LLEGE AL CREATE Estadisitica REQ", data);
  try {
    const response = http.post(API_URL + "cargarLesionRoja", data).then((res) => {
      console.log("LLEGE AL LA DATA CREATE Estadisitica", res);
      return res;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR CREATE", error);
  }
};
const cargarLesionNaranjaService = async (data) => {
  console.log("LLEGE AL CREATE Estadisitica REQ", data);
  try {
    const response = http.post(API_URL + "cargarLesionNaranja", data).then((res) => {
      console.log("LLEGE AL LA DATA CREATE Estadisitica", res);
      return res;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR CREATE", error);
  }
};

const cargarMvpService = async (data) => {
  console.log("LLEGE AL CREATE Estadisitica REQ", data);
  try {
    const response = http.post(API_URL + "cargarMvp", data).then((res) => {
      console.log("LLEGE AL LA DATA CREATE Estadisitica", res);
      return res;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR CREATE", error);
  }
};


const estadisticasServices = {
  getEstadisticasService,
  cargarRojasService,
  cargarAmarillasService,
  cargarLesionRojaService,
  cargarLesionNaranjaService,
  cargarMvpService,
};

export default estadisticasServices;
