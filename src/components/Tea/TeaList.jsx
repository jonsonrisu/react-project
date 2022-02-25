import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Helper from '../../helpers/helper';
import TeaServices from '../../services/tea.service';
import Pagination from "@material-ui/lab/Pagination";
import '../../App.css';

const TeaList = () => {

// posts
const [tea, setTea] = useState([]);
const [successful, setSuccessful] = useState(false);
const [message, setMessage] = useState("");
const [searchName, setSearchName] = useState("");
const [currentIndex, setCurrentIndex] = useState(0);
const [page, setPage] = useState(1);
const [count, setCount] = useState(0);
const [imgUrl, setimgUrl] = useState('');

const [pageSize, setPageSize] = useState(5);
const pageSizes = [5, 10, 25];


const onChangeSearchName = (e) => {
  const searchName = e.target.value;
  setSearchName(searchName);
};

const getRequestParams = (searchName, page, pageSize) => {
  let params = {};
  if (searchName) {
    params["name"] = searchName;
  }
  if (page) {
    params["page"] = page - 1;
  }
  if (pageSize) {
    params["size"] = pageSize;
  }
  return params;
};

const retrieveTeas = () => {    
  const params = getRequestParams(searchName, page, pageSize);
  TeaServices.getTeaList(params).then(
    (response) => {
      const tea = response.data.res.docs;
      const totalPages = response.data.totalPages;
      setTea(tea);
      setimgUrl('http://localhost:3000/');
      setCount(totalPages);
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        setTea(_content);
    }
  );

};

useEffect(retrieveTeas, [searchName,page, pageSize]);
function handleDeleteTea(id) {
  TeaServices.deleteTea(id).then(
    (response) => {
      setMessage(response.data.message);
      setSuccessful(true);
      const newList = tea.filter((item) => item.id !== id);
      setTea(newList);
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        setTea(_content);
    }
  );
}

const handlePageChange = (event, value) => {
  setPage(value);
  setCurrentIndex(pageSizes);
};
const handlePageSizeChange = (event) => {
  setPageSize(event.target.value);
  setPage(1);
};
    
  return (
   <>
    <div>
        <Link to={"/tea/create"} className="btn btn-sm btn-outline-primary">
          Add Tea
        </Link>

        <div className="mt-3">
          <div className='row'>
            <div className='col-md-4'>
                  <label htmlFor="">Page </label>
              <div className="mb-4 dataTables_length">
            
                <select onChange={handlePageSizeChange} className="form-control" value={pageSize}>
                  {pageSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col-md-8'>
            <label htmlFor="">Name </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={onChangeSearchName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Description</th>
            <th scope="col">Feedbacks</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tea.map((row, key) =>
            <tr key={key}>
              <th scope="row">{key + 1}</th>
              <td>{row.name}</td>
              <td><img src={imgUrl + row.image} className="teaImgTable"/></td>
              <td>{Helper.toShort(row.description)}</td>
              <td>{row.comments.length}</td>
              <td>
                <Link to={row.id} className="btn btn-sm btn-outline-primary mx-2">
                  Edit
                </Link>
                <button type="button" onClick={() => handleDeleteTea(row.id)} className="btn btn-sm btn-outline-danger">Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination-wrapper">
        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
   </>
  )
}
export default TeaList