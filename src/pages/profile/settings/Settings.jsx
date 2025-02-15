import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Spinner } from "react-bootstrap";
import avatar from "../../../assets/images/profile/avatar.png";
import "./settings.scss";
import { useState } from "react";
import { auth } from "../../../lib/firebase";
import { validateField } from "../../../components/Validation/Validation";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
const Settings = ({onSubmit}) => {
  const user = auth.currentUser;
  const [username, setUsername] = useState(user.displayName);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const isDisabled =
    loading || !username || Object.values(errors).some((error) => error);

  const handleInputChange = (e) => {
    const value = e.target.value;

    setUsername(value);
    const error = validateField('username', value);
    setErrors(error);
  };
  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    setLoading(true);
    let isValid = true;
      const error = validateField('username', username);
      if (error) {
        setErrors(error);

        isValid = false;
        setLoading(false);
      }
    

    if (user) {
     if(isValid){
      try {
        setLoading(true);
        await updateProfile(user, { displayName: username });
        toast.success("Username updated successfully!");
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
        onSubmit()
      }
     }
    } else {
      toast.error("No user is signed in.");
    }
  };
  return (
    <div className="settings">
      <div className="avatar text-center">
        <Form.Label className="position-relative" htmlFor="formFile">
          <img src={avatar} alt="" loading="lazy" />
          <div className="position-absolute icon">
            <FontAwesomeIcon icon={faCamera} />
          </div>
        </Form.Label>
        <Form.Control type="file" id="formFile" accept="image/*" />
      </div>

      <Form onSubmit={handleUpdateUsername}>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          className="mb-3"
        />
        <Button type="submit" className="custom-btn d-block w-100 mx-auto" disabled={isDisabled}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" />
                <span>Loading...</span>
              </>
            ) : (
              "Update"
            )}
          </Button>
      </Form>
    </div>
  );
};
export default Settings;
