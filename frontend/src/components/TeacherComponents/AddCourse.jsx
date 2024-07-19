import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Redux/TeacherReducer/action";
import { useNavigate } from "react-router-dom";
import TeacherNavTop from "./TeacherNavTop";
import "./AddCourse.css";

const AddTeacherCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    title: "",
    description: "",
    category: "",
    price: "",
    img: "",
  };

  const [detail, setDetail] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addProduct(detail));
    alert("Course Added Successfully");
    navigate("/Teacher/courses");
  };

  return (
    <div className="container">
      <div className="nav-top">
        <TeacherNavTop />
      </div>
      <div className="form-container">
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={detail.title}
              onChange={handleChange}
              placeholder="Enter Course Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={detail.description}
              onChange={handleChange}
              placeholder="Enter Course Description"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={detail.category}
              onChange={handleChange}
              placeholder="Enter Course Category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={Number(detail.price)}
              onChange={handleChange}
              placeholder="Enter Course Price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Thumbnail</label>
            <input
              type="text"
              id="img"
              name="img"
              value={detail.img}
              onChange={handleChange}
              placeholder="Enter Course Thumbnail Link"
            />
          </div>
          <button type="button" onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherCourse;
