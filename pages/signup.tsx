import AuthenticationForm from "../components/AuthenticationForm";

const Signup = () => {
  return <AuthenticationForm mode="signup" />;
};

Signup.isAuthPage = true;

export default Signup;
