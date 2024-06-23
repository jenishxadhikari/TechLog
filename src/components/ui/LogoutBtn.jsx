import  authService  from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Button from "../ui/Button";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return <Button onClick={logoutHandler} text="Logout" />;
}

export default LogoutBtn;
