import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import AuthService from '../../services/auth.service';
import Helper from '../../helpers/helper';
import PostService from '../../services/post.service';
import Pagination from "@material-ui/lab/Pagination";
import '../../App.css';

const PostList = () => {

  // posts
  const [post, setPost] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const pageSizes = [5, 10, 25];


  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};
    if (searchTitle) {
      params["title"] = searchTitle;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  };

  const retrievePosts = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    PostService.getAllPost(params).then(
      (response) => {
        const post = response.data.res;
        const totalPages = response.data.totalPages;
  
        setPost(post);
        setCount(totalPages);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setPost(_content);
      }
    );

  };


useEffect(retrievePosts, [page, pageSize]);


  function handleDeletePost(id) {
    PostService.deletePost(id).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        const newList = post.filter((item) => item.id !== id);
        setPost(newList);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setPost(_content);
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
        <Link to={"/post/create"} className="btn btn-sm btn-outline-primary">
          Add Post
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
            <label htmlFor="">Title </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={retrievePosts}
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
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {post.map((row, key) =>
            <tr key={key}>
              <th scope="row">{key + 1}</th>
              <td>{row.title}</td>
              <td>{Helper.toShort(row.description)}</td>
              <td>{row.status === 'Y' ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">Inactive</span>}</td>
              <td>
                <Link to={row.id} className="btn btn-sm btn-outline-primary mx-2">
                  Edit
                </Link>
                <button type="button" onClick={() => handleDeletePost(row.id)} className="btn btn-sm btn-outline-danger">Delete</button>
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
  );
}

export default PostList;
