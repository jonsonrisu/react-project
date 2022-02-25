import React from "react";
import {  Routes, Route, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./common/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import User from "./components/User";
import Admin from "./components/Admin";
import PostList from "./components/Post/PostList";
import AddPost from "./components/Post/AddPost";
import EditPost from "./components/Post/EditPost";
import Tea from "./components/Tea/Tea";
import TeaList from "./components/Tea/TeaList";
import TeaDeatils from "./components/Tea/TeaDeatils";


const App = () => {
  return (
    <div>
      <Navbar/>
      <div className="container mt-3">
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" el ement={<Profile />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/post" element={<PostList /> } />
            <Route path="/post/create" element={ <AddPost /> } />
            <Route path="/post/:id" element={ <EditPost /> } />
            <Route path="/tea" element={ <TeaList /> } />
            <Route path="/tea/create" element={ <Tea /> } />
            <Route path="/tea/:name" element={ <TeaDeatils /> } />
          </Routes>
      </div>
    </div>
  );
};
export default App;