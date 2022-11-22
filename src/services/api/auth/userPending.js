
import axiosHttp from "../../apiAxios";
const http = axiosHttp()
/*
    #TODO:Prueba con administradores
*/
const API_URL = "userPending/";
 

const registerUserPendingService = async (userData) => {

  const response = await http
    .post(API_URL+"register", userData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
        console.log(err);
        return err
      
    });
    return response
};

//rechazarUserPendingService
const rechazarUserPendingService = async (user) => {
console.log("ID RECHAZAR",user);
  const response = await http
    .put(API_URL+'rechazar', user)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
        console.log(err);
        return err

    });
    return response
}




const getUsersPendingService = async () => {
    const response = await http
        .get(API_URL + "getUsersPending")
        .then((res) => {
            return res.data;
        }
        )
        .catch((err) => {
            console.log(err);
            return err

        }
        );
        return response
}

//getFilterUserpending
const getFilterUserpendingService = async (filter) => {
    const response = await http
        .get(API_URL + "filterUserpending/"+filter)
        .then((res) => {
            return res.data;
        }
        )
        .catch((err) => {
            console.log(err);
            return err
        }
        );
        return response
}
          



const userPendingService = {
    registerUserPendingService,
    getUsersPendingService,
    rechazarUserPendingService,
    getFilterUserpendingService
  };
export default userPendingService;