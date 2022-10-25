
import axiosHttp from "../../apiAxios";
const http = axiosHttp()

const API_URL = "equipos/";
const getEquipos = async (pagina,search,cantidadItems,querySort) => {
    console.log("LLEGE AL OBTENER EQUIPOS")
try{
    const data  =  http
      .get(API_URL+`obtenerEquipos?pagina=${pagina}&search=${search}&cantidadItems=${cantidadItems}&field=${querySort.field}&order=${querySort.sort}`)
      .then((response) => {
            console.log("LLEGE AL LA DATA equipos VEVO",response.data)
            return response.data;
      });
      return data
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}

//getEquiposXnacion
const getEquiposXnacion = async (formData) => {
  console.log("LLEGE AL OBTENER EQUIPOS X NACION")
try{
  const data  =  http
    .get(API_URL+"equiposxnacion/"+ formData.nacion_id+`?season_id=${formData.season_id}`)
    .then((response) => {
          console.log("LLEGE AL LA DATA equipos X NACION",response.data)
          return response.data;
    });
    return data

}
  catch (error) {
console.log("LLEGE AL ERROR",error)
};

}
const createEquiposService = async (equipo) => {
  console.log("LLEGE AL CREATE SERVICE EQUIPO")
try{
  const data  =  http
    .post(API_URL+"createEquipo",equipo)
    .then((response) => {
          console.log("Creando Equipo",response.data)
          return response.data;
    });
    return data
  
}
catch (error) {
  console.log("LLEGE AL ERROR",error)
};
}
const deleteEquiposService = async (id) => {
  console.log("LLEGE AL SERVICE DELETE EQUIPO")
try{
  const data  =  http
    .delete(API_URL+"deleteEquipo/"+id)
    .then((response) => {
          console.log("LLEGE AL THEN DE DELETE EQUIPO",response.data)
          return response.data;
    });
    return data
  
}
catch (error) {
  console.log("LLEGE AL ERROR",error)
};
}
const updateEquiposService = async (formEquipo) => {
  console.log("LLEGE AL UPDATE EQUIPO")
try{
  const data  =  http
    .put(API_URL+"updateEquipo",formEquipo)
    .then((response) => {
          console.log("LLEGE AL UPDATE EQUIPO THEN",response.data)
          return response.data;
    });
    return data
  
}
catch (error) {
  console.log("LLEGE AL ERROR",error)
};
}
const getEquiposSearchService = async (search) => {
  console.log("LLEGE AL OBTENER EQUIPOS X NACION")
try{
  const data  =  http

  //query
    .get(API_URL+"equiposSearch/"+search)
    .then((response) => {
          console.log("LLEGE AL LA DATA equipos X NACION",response.data)
          return response.data;
    });
    return data

}
  catch (error) {
console.log("LLEGE AL ERROR",error)
};

}



const equiposServices = {
    getEquipos,
    createEquiposService,
    deleteEquiposService,
    updateEquiposService,
    getEquiposXnacion,
    getEquiposSearchService

}

export default equiposServices