import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigatioBar";

export default function MainLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}
