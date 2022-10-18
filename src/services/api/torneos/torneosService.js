
import axiosHttp from "../../apiAxios";

const http = axiosHttp()


const API_URL = "torneos/";
const getTorneosService = async () => {
    console.log("LLEGE AL GET torneos REQ")
try{
    const response  =  http
      .get(API_URL+"obtenerTorneos")
      .then((res) => {
            console.log("LLEGE AL LA DATA GET torneo",res.data)
            return res.data;
      });
      return response
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR GET",error)
  };
}

//crearEquiposByTorneo

const createEquiposByTorneoService = async (formData) => {
    console.log("LLEGE AL POST createEquiposByTorneo REQ",formData)
try{
    const response  =  http
      .post(API_URL+"crearEquiposByTorneo",formData)
      .then((res) => {
            console.log("LLEGE AL LA DATA POST createEquiposByTorneo",res.data)
            return res.data;
      });
      return response

  }
  catch (error) {
    console.log("LLEGE AL ERROR POST",error)
  };
}


//obtenerTiposTorneos
const getTiposTorneosService = async () => {
  const API_URL_TIPOS = "tipos-torneos/";
  console.log("LLEGE AL GET tiposTorneos REQ")
try{
  const response  =  http
    .get(API_URL_TIPOS+"obtenerTipos")
    .then((res) => {
          console.log("LLEGE AL LA DATA GET tiposTorneos",res.data)
          return res.data;
    });
    return response

}
  catch (error) {
console.log("LLEGE AL ERROR GET",error)
};
}


const createTorneosService = async (formData) => {
    console.log("LLEGE AL CREATE toreno REQ",formData)
try{
    const response  =  http
      .post(API_URL +"crearTorneo", formData)
      .then((res) => {
            console.log("LLEGE AL LA DATA CREATE torneo",res)
            return res;
      });
      return response

  }
  catch (error) {
    console.log("LLEGE AL ERROR CREATE",error)
  };
}
const updateTorneosService = async (formData) => {
  console.log("LLEGE AL UPDATE torneo REQ")
try{

  const response  =  http
    .put(API_URL +"actualizarTorneo", formData)
    .then((res) => {
          console.log("LLEGE AL LA DATA UPDATE torneo" ,res.data)
          return res.data;
    });
    return response
  }
    catch (error) {
  console.log("LLEGE AL ERROR",error)
};

}
  
  const deleteTorneosService = async (id) => {
    console.log("LLEGE A DELETE Torneo REQ",id)
try{
   const response  =  http
      .delete(API_URL+"eliminarTorneo/"+ id)
      .then((res) => {
            console.log("Ejecutando el delete torneo",res.data)

            return res.data;
      });
      return response
    }
      catch (error) {
    console.log("LLEGE AL ERROR Del DELETE",error)
  };
}


const torneosServices = {
    getTorneosService,
    createTorneosService,
    updateTorneosService,
    deleteTorneosService,
    getTiposTorneosService,
    createEquiposByTorneoService



}

export default torneosServices