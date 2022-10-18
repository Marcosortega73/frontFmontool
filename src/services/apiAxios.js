import axios from "axios";
import authHeader from "./helpers/authHeader";


 const axiosHttp = () => {

const permissions = JSON.parse(localStorage.getItem('permissions'));

let http;
if(permissions?.token)
{

 http = axios.create({
    baseURL:"http://localhost:3030/api",
    headers: {
        'Authorization':'Bearer ' + permissions.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

  });

}else
{
  console.log("ENTRO SIN TOKEN");
   http = axios.create({
    baseURL:"http://localhost:3030/api",  
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      
  });
}
return http;
}
export default axiosHttp;

