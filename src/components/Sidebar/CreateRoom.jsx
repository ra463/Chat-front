import React from "react";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { setCurrentPage } from "../../features/generalSlice";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateRoom(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const [name, setName] = React.useState("");

  const createRoom = async () => {
    try {
      const { data } = await axios.post(
        "/api/room/create-room",
        {
          name,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        dispatch(setCurrentPage({ currentPage: `${data.room.name}` }));
        setTimeout(() => {
          navigate(`/room/${data.room._id}`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Room
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Container className="small-container">
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="success"
            type="submit"
            disabled={loading ? true : false}
            onClick={createRoom}
          >
            {loading ? <Spinner /> : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
