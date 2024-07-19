import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { changeRole } from '../../Redux/TeacherReducer/action';
import './TeachVerify.css';

const TeachVerify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  function teacher() {
    dispatch(changeRole('teacher', user.userId));
    navigate("/TeacherDashboard");
  }

  return (
    <div className="container">
      <div className="inner-container">
        <div className="text-center mb-4">
          <h1 className="heading">Terms & Conditions</h1>
          <p className="subheading">
            Please read the following terms and conditions carefully before proceeding.
          </p>
        </div>
        <ul className="list mb-4">
          <li className="list-item">
            You must be at least 18 years old to register as a teacher on our platform.
          </li>
          <li className="list-item">
            You must possess the necessary qualifications, expertise, and authority to teach the courses you add to the platform.
          </li>
          <li className="list-item">
            You are required to provide accurate and complete information during the registration process.
          </li>
        </ul>
        <div className="form-control">
          <label className="form-label">
            <input type="checkbox" className="checkbox" defaultChecked /> Yes, I have read all the terms and conditions. I accept the agreement.
          </label>
        </div>
        <div className="text-center mt-4">
          <button className="button" onClick={teacher}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeachVerify;
