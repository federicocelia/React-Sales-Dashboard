import { useAuth } from "../context/AuthContex";

const Signin = () => {
  const { session } = useAuth();

  return (
    <>
      <h1 className="landing-header">Paper Lika a Boss</h1>
    </>
  );
};

export default Signin;
