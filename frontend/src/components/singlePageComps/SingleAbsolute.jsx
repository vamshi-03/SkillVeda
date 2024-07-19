import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './single.css';

const SingleAbsolute = ({ props }) => {
  const [page, setPage] = useState('left');
  const [random, setRandom] = useState(0);

  const { onOpen, price, img } = props;

  function handlePayment() {
    onOpen();
  }

  useEffect(() => {
    setRandom((Math.random() * 20).toFixed());
  }, []);

  return (
    <div className="container">
      <div>
        <div>
          <img src={img} alt="Course" className="course-image" />
        </div>
        <div className="tab-container">
          <div
            onClick={() => setPage('left')}
            className={`tab ${page === 'left' ? 'active-tab' : ''}`}
          >
            Personal
          </div>
          <div
            onClick={() => setPage('right')}
            className={`tab ${page === 'right' ? 'active-tab' : ''}`}
          >
            Teams
          </div>
        </div>
      </div>
      <div className="content">
        <div>
          <h3 className="title">
            Subscribe to SkillVeda's top courses
          </h3>
          <p className="description">
            Get this course, plus 8,000+ of our top-rated courses with Personal
            Plan{' '}
            <a href="#" className="learn-more">
              Learn more
            </a>
          </p>
          <button className="subscribe-button" onClick={handlePayment}>
            Start subscription
          </button>
          <div className="price-info">
            <p className="price">Starting at ₹750 per month</p>
            <p className="cancel">Cancel anytime</p>
          </div>
          <div className="divider">
            <div className="line"></div>
            <p className="or">or</p>
            <div className="line"></div>
          </div>
        </div>

        <div className="discount-info">
          <p className="current-price">₹{price}</p>
          <p className="original-price">₹{((price * (+random + 100)) / 100).toFixed()}</p>
          <p className="discount">{random}% off</p>
        </div>
        <div className="time-left">
          <p className="time">52 minutes </p>
          <p className="time-desc">left at this price!</p>
        </div>
        <button className="buy-button" onClick={handlePayment}>
          Buy this course
        </button>

        <div className="guarantee">
          <p>30-Day Money-Back Guarantee</p>
          <p>Full Lifetime Access</p>
        </div>

        <div className="links">
          <div>
            <Link to=''>share</Link>
          </div>
          <div>
            <Link to=''>Gift this course</Link>
          </div>
          <div>
            <Link to=''>Apply Coupon</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAbsolute;
