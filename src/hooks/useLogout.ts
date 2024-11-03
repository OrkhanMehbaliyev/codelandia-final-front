import { message } from "antd";
import { useLogoutMutation } from "../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authorization/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

const useLogout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const username = user?.username;
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      message.success(`Good bye, ${username}.`);
      dispatch(logoutUser());
      navigate("/");
    } catch (err: any) {
      message.error(err.date.error);
    }
  };
  return handleLogout;
};
export default useLogout;
