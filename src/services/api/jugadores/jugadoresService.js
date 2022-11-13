
import axiosHttp from "../../apiAxios";
const http = axiosHttp()


const API_URL = "jugadores/";
const getJugadoresService = async () => {
    console.log("LLEGE AL GET JUGADORES REQ")
try{
    const response  =  http
      .get(API_URL+"obtenerJugadores")
      .then((res) => {
            console.log("LLEGE AL LA DATA GET JUGADOR",res.data)
            return res.data.players;
      });
      return response
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR GET",error)
  };
}

const getFilterJugadoresService = async (pagina,search,cantidadItems) => {
    console.log("LLEGE AL GET FILTER JUGADORES REQ")
try{
    const response  =  http
      .get(API_URL+"filtros"+`?pagina=${pagina}&search=${search}&cantidadItems=${cantidadItems}`)
      .then((res) => {
           
            return res.data;
      });
      return response
    }
    catch (error) {
      console.log("LLEGE AL ERROR GET",error)
    };
}



const createJugadorService = async (jugador) => {
    console.log("LLEGE AL CREATE JUGADOR REQ")
try{
    const response  =  http
      .post(API_URL +"crearJugador", jugador)
      .then((res) => {
            console.log("LLEGE AL LA DATA CREATE JUGADOR",res.data)
            return res.data;
      });
      return response

  }
  catch (error) {
    console.log("LLEGE AL ERROR CREATE",error)
  };
}
const updateJugadorService = async (jugador) => {
  console.log("LLEGE AL UPDATE JUGADOR REQ")
try{

  const response  =  http
    .put(API_URL +"actualizarJugador", jugador)
    .then((res) => {
          console.log("LLEGE AL LA DATA UPDATE JUGADOR" ,res.data)
          return res.data;
    });
    return response
  }
    catch (error) {
  console.log("LLEGE AL ERROR",error)
};

}

const uploadBaseDatosService = async (formData) => {
    console.log("LLEGE AL UPDATE JUGADOR REQ")
try{

    const response  =  http
      .post(API_URL +"uploads/jugadores", formData)
      .then((res) => {
            return res.data;
      });
      return response
    }
      catch (error) {
    console.log("LLEGE AL ERROR UPLOAD",error)
  };

  }
  const deleteJugadorService = async (id) => {
    console.log("LLEGE A DELETE JUGADOR REQ",id)
try{
   const response  =  http
      .delete(API_URL+"eliminarJugador/"+ id)
      .then((res) => {
            console.log("Ejecutando el delete Jugador",res.data)

            return res.data;
      });
      return response
    }
      catch (error) {
    console.log("LLEGE AL ERROR Del DELETE",error)
  };
}

const getJugadoresByEquipoService = async (id) => {
  try{
    const response  =  http
    .get(API_URL+"jugadoresByEquipo/"+id)
    .then((res) => {
          console.log("LLEGE AL LA DATA GET JUGADOR",res.data)
          return res.data.players;
    });
    return response

  }
  catch(error){
    console.log("LLEGE AL ERROR Del DELETE",error)
  }
}

const jugadoresServices = {
    getJugadoresService,
    createJugadorService,
    updateJugadorService,
    uploadBaseDatosService,
    deleteJugadorService,
    getFilterJugadoresService,
    getJugadoresByEquipoService


}

export default jugadoresServices