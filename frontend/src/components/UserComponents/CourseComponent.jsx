import React from "react";
import LandingPageCarousel from "../../Pages/LandingPageComponents/LandingPageCarousel";
import InProgressCarousel from "./InProgressCarousel";
import "./CourseComponent.css";

const CourseComponent = () => {
  return (
    <div className="course-component">
      <div className="course-section">
        <h2 className="course-heading">All Courses</h2>
        <div className="carousel-wrapper">
          <LandingPageCarousel />
        </div>
      </div>

      <div className="course-section">
        <h2 className="course-heading">In Progress Courses</h2>
        <div className="carousel-wrapper">
          <InProgressCarousel />
        </div>
      </div>

      <div className="course-section">
        <h2 className="course-heading">Top courses in Business</h2>
        <div className="carousel-wrapper">
          <LandingPageCarousel />
        </div>
      </div>

      <div className="course-section">
        <h2 className="course-heading">Top courses in IT & Software</h2>
        <div className="carousel-wrapper">
          <LandingPageCarousel />
        </div>
      </div>

      <div className="course-section">
        <h2 className="course-heading">Top courses in Personal Development</h2>
        <div className="carousel-wrapper">
          <LandingPageCarousel />
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
