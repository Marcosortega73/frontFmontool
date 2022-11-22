

import axiosHttp from "../../apiAxios";
const http = axiosHttp()

const API_URL = "extras/";


const getdataDashboardService = async () => {
    console.log("LLEGE AL GET dataDashboard REQ")
try{
    const response  =  http
        .get(API_URL+"obtenerDashboard")
        .then((res) => {
            console.log("LLEGE AL LA DATA GET dataDashboard",res.data)
            return res.data;
        });
        return response

}
    catch (error) {
console.log("LLEGE AL ERROR GET",error)

};

}


 
const dashboardService = {
    getdataDashboardService
}

export default dashboardService;