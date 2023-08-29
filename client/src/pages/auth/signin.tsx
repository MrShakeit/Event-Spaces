import { Link } from "react-router-dom";
import Login from "../../components/auth/signin-form";

export const LoginPage = () => {
  const handleClick = () => {
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:8000/users?limit=20&page=0", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json().then((data) => alert(JSON.stringify(data))))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Login />
      <button onClick={handleClick}>fetch</button>
      <button onClick={handleClick}>fetch</button>
    </>
  );
};
