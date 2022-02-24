import React, { useState, useEffect } from 'react';
import TeaServices from '../../services/tea.service';
import { useParams, useNavigate } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import AuthService from '../../services/auth.service';
import Helper from '../../helpers/helper'; 
const currentUser = AuthService.getCurrentUser();


const TeaDeatils = () => {

    const [tea, setTea] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const name = useParams();
    const imgUrl = "http://localhost:3000/"
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        TeaServices.getSingleTea(name).then(
            (response) => {
                setTea(response.data.res);
                setCommentList(response.data.res.comments);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setSuccessful(false);
            }
        )

    }, []);
    const handleChange = (event) => {
        event.persist();
        setComment({comment : event.target.value, username :currentUser.username});
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        addComment(comment,name);
      };

    function addComment(comment,name) {
        TeaServices.addComment(comment,name).then(
            (response) => {
                console.log(response);
                setMessage(response.data.message);
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setMessage(resMessage);
                setSuccessful(false);
              }
        )
    }

    return (
        <>
            <div className="col-md-12">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <h1 className="display-4 fst-italic"><i>{tea.name}</i></h1>
                        <h3 className="mb-0">{tea.keywords}</h3>
                        <div className="mb-1 text-muted">Made In - <b>{tea.origin}</b></div>
                        <p className="card-text mb-auto ">{tea.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                Temperature:-  {tea.temperature} &deg;C
                            </div>
                            <small className="text-muted">Brew time:-{tea.brew_time} mins</small>
                        </div>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <img className="col-auto d-none d-lg-block" height={300} src={imgUrl + tea.image} alt="" />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-6">
                        {/* commnet lis here */}

                        {commentList.map((row, key) =>
                            <div className='comment-list mt-2' key={key}>
                                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img"
                                    className="profile-img-comment"
                                />
                                <h3 className='mb-5'> {Helper.toTitles(row.user)} <span className='span-time float-right'></span></h3>
                                <ul>
                                    <li>{row.text}</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="col-md-6">
                        <button className="btn btn-primary mb-3" onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}>
                            Give your feedback
                        </button>
                       
                        <Collapse in={open}>
                            <div id="example-collapse-text">
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
                                <form  onSubmit={handleSubmit}>
                                    <input type="hidden" name="user" onChange={handleChange} value={currentUser.username} />
                                    <textarea name="comment" id="" cols="30" rows="4" className='form-control' onChange={handleChange} required={true} value={comment.comment}></textarea>
                                    <button type="submit" className="btn btn-primary float-right mt-2">Comment</button>
                                </form>

                            </div>
                        </Collapse>

                    </div>
                </div>

            </div>
        </>
    )
}

export default TeaDeatils