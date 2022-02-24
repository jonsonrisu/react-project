import axios from "axios";

import AuthService from "./auth.service";

const currentUser = AuthService.getCurrentUser();

const API_URL = "http://localhost:3000/api/posts/";

const getAllPost = (param) =>{
    
   let title = param.title ?param.title :'' ;
    return axios.get(
       API_URL +'?page='+param.page+'&size='+param.size+'&title='+title+'',
       {headers: {
           "x-access-token" : currentUser.accessToken
         }
       }
     );
}


const createPost = (data) =>{

    return axios.post(
       API_URL ,  data,
       {headers: {
           "x-access-token" : currentUser.accessToken
         }
       },
     
     );
}

const singlePost = (id) =>{
  return axios.get(
    API_URL+id , 
    {headers: {
        "x-access-token" : currentUser.accessToken
      }
    }
  );
}

const deletePost = (id) =>{
  return axios.delete(
    API_URL+id , 
    {headers: {
        "x-access-token" : currentUser.accessToken
      }
    }
  );
}

const updatePost = (data,id) =>{
  return axios.put(
    API_URL+id,  data,
    {headers: {
        "x-access-token" : currentUser.accessToken
      }
    },
  
  );
}

const PostServices = {
  getAllPost,
  createPost,
  singlePost,
  updatePost,
  deletePost
 
}

export default PostServices



