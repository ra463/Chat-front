import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "../../utils/axiosUtils";
import { Spinner } from "react-bootstrap";

const ChangeProfilePicture = (props) => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      toast.error("Invalid Image format! only jpg, png & jpeg allowed.");
      return;
    } else if (file.size > 1024 * 1024 * 6) {
      toast.error("Image size too large! only 6mb allowed.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", image);

    try {
      setLoading(true);
      const { data } = await axios.patch("/api/user/update-avatar", myForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        localStorage.setItem("profile", data.user.avatar);
        setImagePreview("");
        setImage("");
        props.onHide();
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!props.show) {
      setImagePreview("");
      setImage("");
    }
  }, [props.show]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Avatar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleVideoChange}
            />
          </Form.Group>
          {imagePreview && (
            <div className="prev_img">
              <img src={imagePreview} alt="prev_img" />
            </div>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button onClick={submitHandler} variant="primary">
          {loading ? <Spinner /> : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeProfilePicture;
