import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/shared/Card";
function About() {
  return (
    <Card>
      <div className="about">
        <h1>About This Project</h1>
        <p>This is a React app to make todo list</p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to="/todos">Back To Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default About;
