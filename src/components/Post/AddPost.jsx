import React,{useState} from 'react';
import useForm from "./useForm";
import validate from './PostValidationRules';
import PostServices from '../../services/post.service';

const  AddPost= ()=> {

    const {values, errors,handleChange, handleSubmit} = useForm('add',addPost, validate);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

      function addPost() {
         PostServices.createPost(values).then(
            (response) => {
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
          );
      }
  return(
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
            <form onSubmit={handleSubmit} noValidate id='postAdd'>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input  className={`form-control ${errors.title && 'danger'}`} type="text" name="title" onChange={handleChange} value={values.title || ''} required />
                  {errors.title && (
                    <p className="text-danger">{errors.title}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea rows={4} className={`form-control ${errors.description && 'danger'}`}  name="description" onChange={handleChange} value={values.description || ''} required >
                </textarea>
                </div>
                {errors.description && (
                  <p className="text-danger">{errors.description}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Status</label>
                <div className="control">
                    <select name="status" className={`form-control ${errors.status && 'danger'}`} onChange={handleChange} value={values.status || ''} required>
                        <option value="">Select Status</option>
                        <option value="Y">Active</option>
                        <option value="N">Inactive</option>
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

export default AddPost;
