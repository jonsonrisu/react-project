import axios from "axios";
import AuthService from "./auth.service";

const currentUser = AuthService.getCurrentUser();

const API_URL = "http://localhost:3000/api/tea/";

const  addTea = (data) =>{
    return axios.post(
        API_URL,data,
        {headers: {
            "x-access-token" : currentUser.accessToken,
            'content-type': 'multipart/form-data'
          }
        },
    );
}

const  getTeaList = (param) =>{
    let teaName = param.name ? param.name : '';
    return axios.get(
        API_URL+'?page='+param.page+'&size='+param.size+'&name='+teaName,
        {headers: {
            "x-access-token" : currentUser.accessToken
          }
        },
    );
}

const getSingleTea =(param) => {

 return axios.get(
    API_URL+param.name, 
    
    {headers: {
        "x-access-token" : currentUser.accessToken
      }
    }
 );
}

const addComment = (data,param) =>{
    return axios.post(
        API_URL + param.name,
        data,
        {
            headers:{
                "x-access-token": currentUser.accessToken
            }
        }
    )
}
    
const deleteTea = (id) =>{
    return axios.delete(
        API_URL + id,
        {
            headers:{
                "x-access-token": currentUser.accessToken
            }
        }
    )
}

const TeaServices = {
    addTea,
    getTeaList,
    getSingleTea,
    addComment,
    deleteTea
}

export default TeaServices;