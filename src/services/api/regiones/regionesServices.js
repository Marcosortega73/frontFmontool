
import axiosHttp from "../../apiAxios";
const http = axiosHttp()


const API_URL = "nacionalidad/";
const getNacionalidades = async () => {
    console.log("LLEGE AL USER obtenerNacionalidades SERVICE")
try{
    const data  =  http
      .get(API_URL+"obtenerNacionalidades")
      .then((response) => {
            console.log("LLEGE AL LA DATA obtenerNacionalidades",response.data)
            return response.data;
      });
      return data
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}

//getnacionalidadesxcontinente
const getNacionalidadesxContinente = async (ids) => {
  console.log("LLEGE AL USER obtenerNacionalidadesxContinente SERVICE",ids)
try{
  const data  =  http
    .get(API_URL+"nacionalidadxregion/"+ids.region_id+`?season=${ids.season_id}`)
    .then((response) => {
          console.log("LLEGE AL LA DATA obtenerNacionalidadesxContinente",response.data)
          return response.data;
    });
    return data

}
  catch (error) {
console.log("LLEGE AL ERROR",error)
};

}

//continentes
const API_URL_CONTINENTES = "continentes/obtenerContinentes";
const getContinentes = async () => {
    console.log("LLEGE AL USER obtenerContinentes SERVICE")
try{
    const data  =  http
      .get(API_URL_CONTINENTES)
      .then((response) => {
            console.log("LLEGE AL LA DATA obtenerContinentes",response.data)
            return response.data;
      });
      return data

  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}

const regionesServices = {
    getNacionalidades,
    getContinentes,
    getNacionalidadesxContinente

}

export default regionesServices