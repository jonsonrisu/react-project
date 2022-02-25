import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const BoardAdmin = () => {
const [content, setContent] = useState("");

useEffect(() => {
UserService.getAdminBoard().then(
(response) => {
setContent(response.data);
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

return (
<div className="container">
  <header className="jumbotron">
    <h3>{content.message}</h3>

    
  </header>
  <div className="row">
      <div className="col-md-4 col-xl-3">
        <div className="card bg-c-blue order-card">
          <div className="card-block">
            <h6 className="m-b-20">Total User's</h6>
            <h2 className="text-right"><i className="fa fa-users f-left"></i><span>{content.totalUsers}</span></h2>
            <p className="m-b-0">Today User's<span className="f-right">{content.todayUsers}</span></p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-3">
        <div className="card bg-c-green order-card">
          <div className="card-block">
            <h6 className="m-b-20">Total Posts</h6>
            <h2 className="text-right"><i className="fa fa-rocket f-left"></i><span>{content.totalPosts}</span></h2>
            <p className="m-b-0">Active Post<span className="f-right">{content.activePosts}</span></p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-3">
        <div className="card bg-c-yellow order-card">
          <div className="card-block">
            <h6 className="m-b-20">Total Teas</h6>
            <h2 className="text-right"><i className="fa fa-refresh f-left"></i><span>{content.totalTeas}</span></h2>
            <p className="m-b-0">Today Teas<span className="f-right">{content.todayTeas}</span></p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-3">
        <div className="card bg-c-pink order-card">
          <div className="card-block">
            <h6 className="m-b-20">Total Feedback Received</h6>
            <h2 className="text-right"><i className="fa fa-credit-card f-left"></i><span>{content.feedbackSum}</span></h2>
            <p className="m-b-0">Today Feedbacks<span className="f-right">351</span></p>
          </div>
        </div>
      </div>
    </div>
</div>
);
};

export default BoardAdmin;