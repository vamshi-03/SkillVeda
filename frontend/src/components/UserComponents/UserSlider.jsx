import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import "./UserSlider.css"; // Import your CSS file for styling

const UserSlider = () => {
  const images = [
    "https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?cs=srgb&dl=pexels-max-fischer-5212653.jpg&fm=jpg",
    "https://www.mit.edu/files/images/201807/15656704711_00457bd2c9_b_1.jpg",
    "https://inup.iitkgp.ac.in/images/iit_kgp.jpg",
    "https://www.vedantu.com/seo/content-images/33e42c38-8332-4d51-9dcf-65a4f262b5da.png",
    "https://media.wired.com/photos/6365b7166776a0176c76e4de/master/w_2560%2Cc_limit/All-the-Free-Resources-You-Can-Find-at-Your-Library-Gear-GettyImages-1331816640.jpg",
    "https://images.seattleschild.com/wp-content/uploads/2021/09/Classy-Treehouse-w-logo-e1632341660272.png",
  ];

  const textOnImage = [
    "Group Studies",
    "Degree from Recognized Institutes",
    "Prestigious Institutions",
    "Online Classes",
    "Study Notes",
    "Successful Career",
  ];

  const indexDescription = [
    "SkillVeda encourages collaborative group studies, creating a vibrant learning environment where students can connect and learn together. It offers a versatile platform for educators to share their knowledge, helping students excel academically.",
    "Secure your degree from renowned institutes with SkillVeda's comprehensive education solutions. SkillVeda provides access to globally recognized institutions, ensuring students receive quality education and gain valuable qualifications for their future careers.",
    "SkillVeda unlocks access to prestigious educational institutions, elevating your academic journey to new heights. With SkillVeda, you can explore a world of educational opportunities, expanding your knowledge and skills in various fields.",
    "Experience dynamic online classes on SkillVeda's intuitive platform, tailored to modern learners' needs. SkillVeda's user-friendly interface and interactive features make online learning engaging and effective, helping students succeed in today's digital age.",
    "Access meticulously crafted study notes on SkillVeda to enhance your understanding and retention of course materials. SkillVeda's comprehensive study resources empower students to excel in their studies and gain a deeper understanding of their subjects.",
    "SkillVeda is your gateway to a successful career, offering the knowledge and skills needed for professional excellence. With SkillVeda, you can prepare for a bright future and achieve your career goals through high-quality education and training."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (value) => {
    setCurrentIndex(value);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="user-slider-container">
      <div className="slider-wrapper">
        <button className="slider-nav-btn" onClick={handlePrevious}>
          <ArrowLeftIcon />
        </button>
        <div className="slider-content">
          <div className="slider-text-overlay">
            <h2 className="slider-text">
              {textOnImage[currentIndex]}
            </h2>
          </div>
          <img
            className="slider-image"
            src={images[currentIndex]}
            alt={textOnImage[currentIndex]}
          />
        </div>
        <button className="slider-nav-btn" onClick={handleNext}>
          <ArrowRightIcon />
        </button>
      </div>
      <div className="slider-description">
        <p>{indexDescription[currentIndex]}</p>
      </div>
    </div>
  );
};

export default UserSlider;
