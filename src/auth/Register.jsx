import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import SocialMediaComponent from "../components/SocialMedia/SocialMediaComponent";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateField } from "../components/Validation/Validation";

const Register = ({ onSubmit, toggleViews }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const isDisabled =
    loading ||
    !userData.username ||
    !userData.email ||
    !userData.password ||
    Object.values(errors).some((error) => error);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    const error = validateField(name, value, userData);
    setErrors({ ...errors, [name]: error });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formErrors = {};
    let isValid = true;

    Object.keys(userData).forEach((field) => {
      const error = validateField(field, userData[field], userData);
      if (error) {
        formErrors[field] = error;
        isValid = false;
        setLoading(false);
      }
    });
    setErrors(formErrors);
    if (isValid) {
      try {
        // Register the user
        const res = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        // Set displayName
        await updateProfile(res.user, {
          displayName: userData.username,
        });
        // Create a user document in Firestore
        await setDoc(doc(db, "users", res.user.uid), {
          email: userData.email,
          id: res.user.uid,
          displayName: userData.username, // Store the displayName in Firestore too
        });
        toast.success("Account created successfully! You can login now!");
        navigate("/profile");
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
        onSubmit();
      }
    }
  };

  return (
    <>
      <div className="register">
      <div className="register-header d-flex flex-column align-items-center justify-content-center gap-4">
          <h2 className="mb-0 text-dark">Sign up </h2>
          <SocialMediaComponent />
        </div>
        <p className="text-center my-4 text-secondary">
          Or using email and password
        </p>


        <Form onSubmit={handleRegister}>
        <Form.Group className="mb-4">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={userData.username}
              onChange={handleInputChange}
              className={`${errors.username && "border-danger"}`}
              required
            />
            {errors.username && (
              <Form.Text className="text-danger">{errors.username}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
              className={`${errors.email && "border-danger"}`}
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
              "Sign up"
            )}
          </button>

          <div className="d-flex gap-3 align-items-center mt-4">
            <p> Have already an acoount ?</p>{" "}
            <p className="login-p" onClick={toggleViews}>
              Sign in
            </p>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Register;
