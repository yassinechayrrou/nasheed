import AuthenticationForm from "../components/AuthenticationForm";

const Signin = () => {
  return <AuthenticationForm mode="signin" />;
};

Signin.isAuthPage = true;

export default Signin;
