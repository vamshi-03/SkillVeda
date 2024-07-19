import React from 'react';
import TeacherNavTop from "./TeacherNavTop"; 
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const courses = [
    { id: 1, title: "Course A", enrolledUsers: 20 },
    { id: 2, title: "Course B", enrolledUsers: 15 },
    { id: 3, title: "Course C", enrolledUsers: 30 },
  ];

  return (
    <div className="teacher-dashboard">
      <div className="nav">
        <div></div>
        <div className="main-content">
          <TeacherNavTop />
          <div className="content">
            <div className="courses-grid">
              {courses.map(course => (
                <div key={course.id} className="course-card">
                  <p className="course-title">{course.title}</p>
                  <div className="course-details">
                    <p>Enrolled Users: {course.enrolledUsers}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bar graph */}
            {/* Your existing Bar graph code */}

            {/* Pie graph */}
            {/* Your existing Pie graph code */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
