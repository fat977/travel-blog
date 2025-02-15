import { doc, updateDoc } from "firebase/firestore";
import { Button, Form, Spinner } from "react-bootstrap";
import { db } from "../../lib/firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateField } from "../../components/Validation/Validation";

const UpdatePost = ({ item, onSubmit }) => {
  const editPost = async (postId, updatedData) => {
    try {
      const postRef = doc(db, "posts", postId); // Reference to the specific post
      await updateDoc(postRef, updatedData);
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error("Error updating post: ", error);
    } finally {
      onSubmit();
    }
  };
  const [post, setPost] = useState({
    title: item.title,
    content: item.content,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formErrors = {};
    let isValid = true;

    Object.keys(post).forEach((field) => {
      const error = validateField(field, post[field], post);
      if (error) {
        formErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(formErrors);
    if (isValid) {
      const updatedData = { title: post.title, content: post.content };
      await editPost(item.id, updatedData);
    }
  };
  return (
    <div className="update-post">
      <Form onSubmit={handleEdit}>
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
export default UpdatePost;
