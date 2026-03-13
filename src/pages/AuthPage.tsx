import { useNavigate } from "react-router";
import { AuthForm } from "../components/AuthForm/AuthForm";


export const AuthPage = () => {

    const navigate = useNavigate()


  return (
    <>
      <h1>Auth Page</h1>
      <AuthForm />

      <p>
        Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
      </p>
    </>
  );
};
