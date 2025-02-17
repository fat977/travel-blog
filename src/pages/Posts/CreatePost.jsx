import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { auth, db } from "../../lib/firebase";
import { toast } from "react-toastify";
import { validateField } from "../../components/Validation/Validation";

const CreatePost = ({ onSubmit }) => {
  const [post, setPost] = useState({
    image: "",
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const isDisabled =
    loading ||
    !post.title ||
    !post.content ||
    Object.values(errors).some((error) => error);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
    const error = validateField(name, value, post);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formErrors = {};
    let isValid = true;

    Object.keys(post).forEach((field) => {
      const error = validateField(field, post[field], post);
      if (error) {
        formErrors[field] = error;
        isValid = false;
        setLoading(false);
      }
    });

    setErrors(formErrors);
    const user = auth.currentUser;
    if (isValid) {
      try {
        await addDoc(collection(db, "posts"), {
          userId: user.uid,
          userName: user.displayName,
          image: post.image,
          title: post.title,
          content: post.content,
          createdAt: new Date(),
        });
        setPost({ image: "", title: "", content: "" });
        toast.success("Post created successfully!");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
        onSubmit();
      }
    }
  };

  return (
    <div className="create-post">
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Image link"
          name="image"
          value={post.image}
          onChange={handleInputChange}
          className="mb-3"
        />
        <Form.Control
          type="text"
          placeholder="Title"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          className="mb-3"
        />
        {errors.title && <small className="text-danger">{errors.title}</small>}

        <Form.Control
          as="textarea"
          rows={"3"}
          placeholder="Content"
          name="content"
          value={post.content}
          onChange={handleInputChange}
          className="mb-3"
        />
        {errors.content && (
          <small className="text-danger">{errors.content}</small>
        )}

        <button type="submit" className="custom-btn d-block w-100 mx-auto" disabled={isDisabled}>
          {loading ? (
            <>
              <Spinner size="sm" animation="border" />
              <span>Loading...</span>
            </>
          ) : (
            "Create"
          )}
        </button>
      </Form>
    </div>
  );
};
export default CreatePost;
