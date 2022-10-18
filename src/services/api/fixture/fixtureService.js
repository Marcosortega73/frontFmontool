import axiosHttp from "../../apiAxios";

const http = axiosHttp();

const API_URL = "fixture/";

const getFixtureService = async () => {
  console.log("LLEGE AL GET Fixture REQ");
  try {
    const response = http.get(API_URL + "obtenerFixture").then((res) => {
      console.log("LLEGE AL LA DATA GET fixture Completo", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }
};

const getFixtureByTorneo = async (id) => {
  console.log("LLEGE AL GET FixtureBYTorneo REQ");
  try {
    const response = http.get(API_URL + "fixtureByTorneo/"+id).then((res) => {
      console.log("LLEGE AL LA DATA GET Response FixtureBYTorneo", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR GET", error);
  }
};
const getFilterFixtureService = async (torneoId,fecha) => {
  console.log("LLEGE AL GET FILTER Fixture REQ")
try{
  const response  =  http
    .get(API_URL+`filtros/${torneoId}?fecha=${fecha}`)
    .then((res) => {
          console.log("FIXTURE FILTER ",res)
          return res.data?.fixture
          ;
    });
    return response
  }
  catch (error) {
    console.log("LLEGE AL ERROR GET",error)
  };
}

//crearEquiposByTorneo

const createFixtureService = async (formData) => {
  console.log("LLEGE AL CREATE fixture REQ", formData);
  try {
    const response = http
      .post(API_URL + "crearFixture", formData)
      .then((res) => {
        console.log("LLEGE AL LA DATA CREATE torneo", res);
        return res;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR CREATE", error);
  }
};

//confirmFixtureService
const confirmFixtureService = async (data) => {
  console.log("LLEGE AL CONFIRM fixture REQ", data);
  try {
    const response = http.post(API_URL + "confirmarFixture", data).then((res) => {
      console.log("LLEGE AL LA DATA CONFIRM fixture", res);
      return res;
    });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR CONFIRM", error);
  }
};

const updateFixtureService = async (formData) => {
  console.log("LLEGE AL UPDATE torneo REQ");
  try {
    const response = http
      .put(API_URL + "actualizarTorneo", formData)
      .then((res) => {
        console.log("LLEGE AL LA DATA UPDATE torneo", res.data);
        return res.data;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR", error);
  }
};

const deleteFixtureService = async (id) => {
  console.log("LLEGE A DELETE Torneo REQ", id);
  try {
    const response = http
      .delete(API_URL + "eliminarTorneo/" + id)
      .then((res) => {
        console.log("Ejecutando el delete torneo", res.data);

        return res.data;
      });
    return response;
  } catch (error) {
    console.log("LLEGE AL ERROR Del DELETE", error);
  }
};

const FixtureServices = {
  getFixtureService,
  createFixtureService,
  updateFixtureService,
  deleteFixtureService,
  confirmFixtureService,
  getFixtureByTorneo,
  getFilterFixtureService,
};

export default FixtureServices;
