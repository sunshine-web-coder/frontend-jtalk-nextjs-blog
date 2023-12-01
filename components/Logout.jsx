import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authReducer';
import { Button } from 'flowbite-react';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <Button
      onClick={handleLogout}
    // className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-base font-semibold leading-normal text-white hover:bg-white hover:text-blue-700"
    >
      Log out
    </Button>
  );
}
