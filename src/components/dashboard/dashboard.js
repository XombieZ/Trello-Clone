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
            flex: 1,
            alignSelf: "stretch",
            height: "100%",
            overflowX: "auto",
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
