import { useRef } from "react";
import { Outlet } from "react-router-dom";
import NavSide from "../nav-side/nav-side";

const Dashboard = () => {
  const outletContainerRef = useRef(null);
  return (
    <>
      <header style={{ height: "100px" }}>
        <h1>Welcome to the ToDO Kanban App</h1>
      </header>
      <div className="dashboard-container">
        <NavSide />
        <div
          style={{
            border: "10px solid green",
            flex: 1,
            alignSelf: "stretch",
            overflowX: "auto",
            backgroundColor: "violet",
          }}
          ref={outletContainerRef}
        >
          <Outlet context={outletContainerRef} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
