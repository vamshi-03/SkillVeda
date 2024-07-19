import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Pages/LandingPageComponents/LandingPageComponent.css";
import Card from "../../Pages/LandingPageComponents/Card";
import LoadingComponent from "../../Pages/LoadingComponents/LoadingComponent";
import axios from "axios";
import "./InProgressCarousel.css";
import { useNavigate } from "react-router-dom";

const InProgressCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  const settings = {
    swipe: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:5000/users/userCourse/${user.userId}`;

    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setCourse(res.data.course);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCourseClick = async (courseId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:5000/api/courses/${courseId}/is-subscribed/${user.userId}`;

    try {
      const response = await axios.get(url);
      console.log("check->"+response);
      const { isSubscribed } = response.data;

      if (isSubscribed) {
        navigate(`/courses/${courseId}`);
      } else {
        navigate(`/courses/${courseId}/payment`);
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);
    }
  };

  return (
    <div className="carousel-container">
      {course.length !== 0 ? (
        <Slider {...settings}>
          {!loading ? course.map((el) => (
            <div key={el._id} onClick={() => handleCourseClick(el._id)}>
              <Card {...el} />
            </div>
          )) : ""}
        </Slider>
      ) : (
        <div className="empty-container">
          <div className="empty-image-wrapper">
            <img
              className="empty-image"
              src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/6d5a0df598037bf7a872f1f8aef118b8.gif"
              alt="Empty"
            />
          </div>
          <p className="empty-text">You haven't subscribed to any course</p>
        </div>
      )}
    </div>
  );
};

export default InProgressCarousel;
