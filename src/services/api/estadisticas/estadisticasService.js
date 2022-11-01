
import axiosHttp from "../../apiAxios";

const http = axiosHttp()


const API_URL = "estadisticas/";
const getEstadisticasService = async () => {
    console.log("LLEGE AL GET Estadisticas REQ")
try{
    const response  =  http
      .get(API_URL+"obtenerEstadisticas")
      .then((res) => {
            console.log("LLEGE AL LA DATA GET Estadisitica",res.data)
            return res.data;
      });
      return response
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR GET",error)
  };
}




const createEstadisticaservice = async (jugadores,data) => {
    console.log("LLEGE AL CREATE Estadisitica REQ",jugadores)
try{
    const response  =  http
      .post(API_URL +"cargarEstadisticas", jugadores)
      .then((res) => {
            console.log("LLEGE AL LA DATA CREATE Estadisitica",res)
            return res;
      });
      return response

  }
  catch (error) {
    console.log("LLEGE AL ERROR CREATE",error)
  };
}
const tarjetaRojaEstadisticaservice = async (jugadores,data) => {
    console.log("LLEGE AL CREATE Estadisitica REQ")
try{
    const response  =  http
      .post(API_URL +"tarjetaRoja",jugadores,data)
      .then((res) => {
            console.log("LLEGE AL LA DATA CREATE Estadisitica",res)
            return res;
      });
      return response

  }
  catch (error) {
    console.log("LLEGE AL ERROR CREATE",error)
  };
}

const updateEstadisticaservice = async (formData) => {
  console.log("LLEGE AL UPDATE Estadisitica REQ")
try{

  const response  =  http
    .put(API_URL +"actualizarEstadisitica", formData)
    .then((res) => {
          console.log("LLEGE AL LA DATA UPDATE Estadisitica" ,res.data)
          return res.data;
    });
    return response
  }
    catch (error) {
  console.log("LLEGE AL ERROR",error)
};

}
  
  const deleteEstadisticaservice = async (id) => {
    console.log("LLEGE A DELETE Estadisitica REQ",id)
try{
   const response  =  http
      .delete(API_URL+"eliminarEstadisitica/"+ id)
      .then((res) => {
            console.log("Ejecutando el delete Estadisitica",res.data)

            return res.data;
      });
      return response
    }
      catch (error) {
    console.log("LLEGE AL ERROR Del DELETE",error)
  };
}

const estadisticasServices = {
    getEstadisticasService,
    createEstadisticaservice,
    updateEstadisticaservice,
    deleteEstadisticaservice,
    tarjetaRojaEstadisticaservice
    



}

export default estadisticasServices