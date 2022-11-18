import axiosHttp from "../../apiAxios";

const http = axiosHttp();

const API_URL = "seasons/";
const getSeasonsService = async () => {
  console.log("LLEGE AL GET Seasons REQ");
  try {
    const response = http.get(API_URL + "obtenerSeasons").then((res) => {
      console.log("LLEGE AL LA DATA GET Season", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }
};

const createSeasonService = async (formData) => {
  console.log("LLEGE AL CREATE season REQ", formData);
  try {
    const response = http
      .post(API_URL + "crearSeason", formData)
      .then((res) => {
        console.log("LLEGE AL LA DATA CREATE Season", res);
        return res;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR CREATE", error);
  }
};
const updateSeasonService = async (formData) => {
  console.log("LLEGE AL UPDATE Season REQ");
  try {
    const response = http
      .put(API_URL + "actualizarSeason", formData)
      .then((res) => {
        console.log("LLEGE AL LA DATA UPDATE Season", res.data);
        return res.data;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR", error);
  }
};

const deleteSeasonService = async (id) => {
  console.log("LLEGE A DELETE Season REQ", id);
  try {
    const response = http
      .delete(API_URL + "eliminarSeason/" + id)
      .then((res) => {
        console.log("Ejecutando el delete Season", res.data);

        return res.data;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR Del DELETE", error);
  }
};

const getJugadoresBySeasonService = async (id) => {
  try {
    const response = http
      .get(API_URL + "getJugadoresBySeason/" + id)
      .then((res) => {
        console.log("LLEGE AL LA DATA GET JUGADOR", res.data);
        return res.data.jugadores;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR Del DELETE", error);
  }
};

const getManagersBySeasonService = async (id) => {
  try {
    const response = http
      .get(API_URL + "getManagerBySeason/" + id)
      .then((res) => {
        console.log(
          "LLEGE AL LA DATA GET getManagersBySeasonService",
          res.data
        );
        return res.data.managers;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR Del DELETE", error);
  }
};
const getEquiposBySeasonService = async (id) => {
  try {
    const response = http
      .get(API_URL + "getEquiposBySeason/" + id)
      .then((res) => {
        console.log("LLEGE AL LA DATA GET getEquiposBySeason", res.data);
        return res.data.equiposSeason;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR Del DELETE", error);
  }
};
const cargarEstadisticasService = async (estadisticas) => {
  try {
    const response = http
      .post(API_URL + "cargarEstadisticas", estadisticas)
      .then((res) => {
        console.log("LLEGE AL LA DATA GET cargarEstadisticasService", res.data);
        return res.data;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR Del DELETE", error);
  }
};

const seasonsServices = {
  getSeasonsService,
  createSeasonService,
  updateSeasonService,
  deleteSeasonService,
  getJugadoresBySeasonService,
  getEquiposBySeasonService,
  getManagersBySeasonService,
  cargarEstadisticasService,
};

export default seasonsServices;
