import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useForm from "./useForm";
import validate from './PostValidationRules';
import PostServices from '../../services/post.service';


function EditPost() {
    const { values, errors, handleChange, handleSubmit } = useForm('edit', postEdit, validate);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const { id } = useParams();
    let navigate = useNavigate();

    function postEdit() {

        PostServices.updatePost(values, id).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                navigate(`/post/`);
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
        );
    }
   
    // const prop=(data) => {
    //     return {
    //     selected:values.status == data ? true : false,
    // }
    // }
    return (
        <div className="section is-fullheight">
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
            <div className="container">
                <div className='row'>
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="box">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="field">
                                    <label className="label">Title</label>
                                    <div className="control">
                                        <input className={`form-control`} type="text" name="title" onChange={handleChange} value={values.title || ''} required />
                                        {errors.title && (
                                            <p className="text-danger">{errors.title}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <div className="control">
                                        <textarea rows={4} className={`form-control`} name="description" onChange={handleChange} value={values.description || ''} required >
                                        </textarea>
                                    </div>
                                    {errors.description && (
                                        <p className="text-danger">{errors.description}</p>
                                    )}
                                </div>
                                <div className="field">
                                    <label className="label">Status</label>
                                    <div className="control">
                                        <select name="status" defaultValue={'Y'} className={`form-control`} onChange={handleChange} required>
                                            <option value=''>Select Status</option>
                                            <option selected={ values.status=='Y'?true:false } value={"Y"}>Active</option>
                                            <option selected={ values.status=='N'?true:false } value={"N"}>Inactive</option>
                                        </select>
                                        {errors.status && (
                                            <p className="text-danger">{errors.status}</p>
                                        )}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </div>

    );
}

export default EditPost;
