import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

import Modals from "./Modal/Modal";

const BoardUser = () => {
  const [content, setContent] = useState([]);
  const [show, setShow] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        const content = response.data.res;
        setContent(content);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setContent(_content);
      }
    );
  }, []);
  const userDelete = (id) =>{
    UserService.deleteUser(id).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        const newList = content.filter((item) => item.id !== id);
        setContent(newList);
        
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setContent(_content);
      }
    );
  }
  return(
    <div className="container">
       {message && (
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        )}
       <button type="button" className="btn btn-outline-primary mx-2 right" onClick={ ()=> setShow(true)}>Add User</button>
        <br/>
      <Modals onClose= {() => setShow(false)} show={show} />
      <table className="jumbotron table">
        <thead >
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
         {content.map((user,key) =>  
          <tr key={key}>
            <th scope="row">{key+1}</th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <button type="button" className="btn btn-outline-primary mx-2" onClick={ ()=> setShow(user)}>Edit</button>
              <button type="button" className="btn btn-outline-danger" onClick={() =>userDelete(user.id)}>Delete</button>
            </td>
          </tr>
         )}
        </tbody>
      </table>
    </div>
  );
};

export default BoardUser;