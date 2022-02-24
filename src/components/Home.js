import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import Helper from "../helpers/helper";
import TeaServices from "../services/tea.service";
import { Link } from "react-router-dom";

const Home = () => {


  // const imUrl = "http://localhost:3000/";
  const [content, setContent] = useState("");
  const [tea, setTea] = useState([]);

  const [imUrl, setimUrl] = useState('');



  useEffect(() => {

    const user = AuthService.getCurrentUser();

    if (!user) {
      return (
        <Navigate
          to={"/login"}
        />
      );
    }
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
        setimUrl('http://localhost:3000/');
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
    TeaServices.getTeaList().then(
      (response) => {
        setTea(response.data.res);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setTea(_content);
      }
    );
  }, []);
  return (
    <div className="container">
      {/* <header className="jumbotron">
        <h3>{content}</h3>
      </header> */}
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            {tea.map((value, key) =>
              // <div className="col-md-4" key={key}>
              //   <div className="card" >
              //     <img className="card-img-top" src={imUrl + value.image} alt="" />
              //     <div className="card-body" >
              //       <h5 className="card-title" >{value.name} <small>({value.origin})</small></h5>
              //       {/* <p className="card-text" >{value.description}</p> */}
              //       <p className="card-footer" >Temperature :-{value.temperature} &deg;C  Brew Time :-{value.brew_time} mins</p>
              //       <a href="#" className="btn btn-primary">Read More</a>
              //     </div>
              //   </div>
              // </div>
              <div className="col-md-4" key={key}>
                <div className="card shadow-sm">
                  <img className="bd-placeholder-img card-img-top" width="100%" height={200} src={imUrl + value.image} alt="" />
                  <div className="card-body">
                    <h5 className="card-title" >{value.name}</h5>
                    <p className="card-text">{Helper.toShort(value.description)}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Link to={'../tea/'+value.name} className="btn btn-sm btn-secondary">
                          View
                        </Link>
                        {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                      </div>
                      <small className="text-muted">{value.brew_time} mins</small>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;