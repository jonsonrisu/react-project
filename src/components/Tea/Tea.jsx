import {React, useState, useEffect} from 'react'
import validate from './TeaValidationRules';
import TeaValidation from './TeaValidationRules';
import useForm from "./useForm";
import TeaServices from '../../services/tea.service';

const Tea = () => {

  const {values,file, errors,handleChange, handleUpload,handleSubmit} = useForm(addTea, validate);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  function addTea() {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("keywords", values.keywords);
    formData.append("origin", values.origin); 
    formData.append("brew_time", values.brew_time);
    formData.append("temperature", values.temperature);
    formData.append("image", file);
    TeaServices.addTea(formData).then(
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
  return (
   
    
      <div className="container">
          <h2> <u>Add Tea</u> </h2>
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
        <div className='row'>
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="box">
              <form noValidate id='addTea' onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <div className='row'>
                    <div className='col-md-6'>
                      <label className="label">Name</label>
                      <div className="control">
                        <input className={`form-control`} type="text" name="name" onChange={handleChange} required value={values.name}/>
                        {errors.name && (
                        <p className="text-danger">{errors.name}</p>
                      )}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <label className="label">Image</label>
                      <div className="control">
                        <input className={`form-control-file`} type="file" name="image" onChange={handleUpload} required />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label className="label">Description</label>
                      <div className="control">
                        <textarea name="description" className='form-control' id="" cols="30" rows="1" onChange={handleChange} value={values.description}></textarea>
                        {errors.description && (
                        <p className="text-danger">{errors.description}</p>
                      )}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <label className="label">Keywords</label>
                      <div className="control">
                        <input className={`form-control`} type="text" name="keywords" onChange={handleChange} required value={values.keywords}/>
                        {errors.keywords && (
                        <p className="text-danger">{errors.keywords}</p>
                      )}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label className="label">Origin</label>
                      <div className="control">
                        <input className={`form-control`} type="text" name="origin" onChange={handleChange} required value={values.origin}/>
                        {errors.origin && (
                        <p className="text-danger">{errors.origin}</p>
                      )}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <label className="label">Brew Time</label>
                      <div className="control">
                        <input className={`form-control`} type="number" name="brew_time" onChange={handleChange} required value={values.brew_time}/>
                        {errors.brew_time && (
                        <p className="text-danger">{errors.brew_time}</p>
                      )}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label className="label">Temperature</label>
                      <div className="control">
                        <input className={`form-control`} type="number" name="temperature" onChange={handleChange} required value={values.temperature}/>
                        {errors.temperature && (
                        <p className="text-danger">{errors.temperature}</p>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
              </form>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
  
  )
}

export default Tea;