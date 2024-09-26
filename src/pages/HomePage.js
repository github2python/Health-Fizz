import React from "react";
import Dashboard from "../components/Dashboard";
import withAuth from "../components/withAuth";

function HomePage() {
  return (
    <div className="home-page">
      <Dashboard />
    </div>
  );
}

export default withAuth(HomePage);
