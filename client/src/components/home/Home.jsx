import React from "react";
import './Home.css'; // Update the import path for the CSS file

function Home() {
  return (
    <div className="home text-center p-2">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <p className="blog m-5 display-2 fw-semibold">Blog App!!</p>
            <p className="para fs-4">Our blog app is a platform designed to share your unique perspectives, insights, and expertise with the world. It provides a user-friendly interface for publishing and accessing blog posts on a wide range of topics, catering to the interests and preferences of your audience. With features such as user authentication, content management, interactive elements like comments and likes, and seamless navigation, your blog app aims to deliver an engaging and immersive experience for both creators and readers. Whether you're a seasoned blogger or just starting out, your blog app serves as a hub for creativity, inspiration, and meaningful connections, fostering a vibrant community around your passion and expertise.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
