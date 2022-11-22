
import axiosHttp from "../../apiAxios";
const http = axiosHttp()

const API_URL = "managerProfile/";


const sendCodeVerifyMail = async () => {

    console.log("envio de codigo de verificacion")

try{
    const data  =  http
      .get(API_URL+"verifyMail")
      .then((response) => {
            console.log("LLEGE AL LA DATA email codigo",response.mensaje)
            return response.mensaje;
      });
      return data
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}

const verifyCodeMail = async (codigo) => {

  try{
    const data  =  http
      .post(API_URL+"validateMail",{codigo})
      .then((response) => {
            console.log("LLEGE validate mail",response)
            return response;
      });
      return data
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };

}

const changeEmail = async (clienteEmail) => {
  console.log("LLEGE AL UPDATE CLIENTE REQ")
try{
    const response  =  http
      .put(API_URL +"updateClient", clienteEmail)
      .then((res) => {
            console.log("LLEGE AL LA DATA UPDATE CLIENTE" ,res.data)
            return res.data;
      });
      return response
    }
    catch (error) {
  console.log("LLEGE AL ERROR",error)
};

}

//updateProfile
const updateProfile = async (formData) => {

  console.log("LLEGE AL UPDATE PROFILE REQ")
try{
    const response  =  http
      .put(API_URL +"updateProfile", formData)
      .then((res) => {
            console.log("LLEGE AL LA DATA UPDATE PROFILE CLIENTE" ,res.data)
            return res.data;
      });
      return response
    }
    catch (error) {
  console.log("LLEGE AL ERROR",error)
};

}

//changePassword
const changePassword = async (formData) => {

  console.log("LLEGE AL UPDATE PASSWORD REQ")
  try{
    const response  =  http
      .put(API_URL +"changePassword", formData)
      .then((res) => {
            console.log("LLEGE AL LA DATA changePassword" ,res.data)
            return res.data;
      });
      return response
    }
    catch (error) {
  console.log("LLEGE AL ERROR",error)
};
}

//updateUsername
const updateUsername = async (formData) => {

  console.log("LLEGE AL UPDATE USERNAME REQ")
  try{
    const response  =  http
      .put(API_URL +"updateUsername", formData)
      .then((res) => {
            console.log("LLEGE AL LA DATA updateUsername" ,res.data)
            return res.data;
      });
      return response
    }
    catch (error) {
  console.log("LLEGE AL ERROR",error)
};
}




const clientServices = {
    sendCodeVerifyMail,
    verifyCodeMail,
    changeEmail,
    updateProfile,
    changePassword,
    updateUsername

}

export default clientServices