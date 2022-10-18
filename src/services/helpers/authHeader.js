
const user = JSON.parse(localStorage.getItem('user'));

const  authHeader =  () =>{
    if (user && user.token) {
    return  {
            headers: {
              'Authorization':'Bearer ' + user.token,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }
      
    } else {
      return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }

      };
    }
  }
    export default authHeader;