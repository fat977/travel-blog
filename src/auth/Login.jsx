import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import SocialMediaComponent from "../components/SocialMedia/SocialMediaComponent";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { validateField } from "../components/Validation/Validation";

const Login = ({ onSubmit, toggleViews }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const isDisabled =
    loading ||
    !userData.email ||
    !userData.password ||
    Object.values(errors).some((error) => error);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    const error = validateField(name, value, userData);
    setErrors({ ...errors, [name]: error });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formErrors = {};
    let isValid = true;

    Object.keys(userData).forEach((field) => {
      const error = validateField(field, userData[field], userData);
      if (error) {
        formErrors[field] = error;
        isValid = false;
      }
    });
    setErrors(formErrors);
    if (isValid) {
      try {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        navigate("/profile");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
        onSubmit();
      }
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="login">
        <div className="login-header d-flex flex-column align-items-center justify-content-center gap-4">
          <h2 className="mb-0 text-dark">Sign in </h2>
          <SocialMediaComponent />
        </div>
        <p className="text-center my-4 text-secondary">
          Or using email and password
        </p>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
              className={`${errors.email && "border-danger"}`}
              required
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleInputChange}
              className={`${errors.password && "border-danger"}`}
            />
            {errors.password && (
               <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>
          <button type="submit" className="custom-btn d-block w-100 mx-auto" disabled={isDisabled}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" />
                <span>Loading...</span>
              </>
            ) : (
              "Sign in"
            )}
          </button>
          <div className="d-flex gap-3 align-items-center mt-4">
            <p className="text-muted">Don't have an account ?</p>
            <p className="register-p" onClick={toggleViews}>
              Sign up
            </p>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Login;
