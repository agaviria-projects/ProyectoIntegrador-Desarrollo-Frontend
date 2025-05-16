import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function LayoutProtegido() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LayoutProtegido;
