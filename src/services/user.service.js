import axios from "axios";

import { Navigate } from "react-router-dom";
import AuthService from "./auth.service";

const API_URL = "http://localhost:3000/api/users/";


const currentUser = AuthService.getCurrentUser();


const getPublicContent = () =>{

    return axios.get(
       API_URL,
       {headers: {
           "x-access-token" : currentUser.accessToken
         }
       }
     );
}

const getUserBoard = () =>{
    return axios.get(
       API_URL + "user",
       {headers: {
           "x-access-token" : currentUser.accessToken
         }
       }
     );
}

const getModeratorBoard = () =>{
    return axios.get(
       API_URL + "mod",
       {headers: {
           "x-access-token" : currentUser.accessToken
         }
       }
     );
}

const getAdminBoard = () =>{
    return axios.get(
       API_URL + "admin",
       {headers: {
           "x-access-token" : currentUser.accessToken
         }
       }
     );
}

const deleteUser = (id) =>{
  return axios.delete(
    API_URL+'delete/' +id,
    {headers: {
      "x-access-token" : currentUser.accessToken
    }
  }

  );
}

const UserServices = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    deleteUser
}


export default UserServices;
