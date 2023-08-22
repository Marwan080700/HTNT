import { Button, Modal } from "react-bootstrap";

export default function ModalDelete({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-dark">
        <div
          style={{ fontSize: "20px", fontWeight: "900" }}
          className="text-center"
        >
          Delete Data
        </div>
        <div
          style={{ fontSize: "16px", fontWeight: "500" }}
          className="mt-4 text-center"
        >
          Are you sure you want to delete this data?
        </div>
        <div className="text-end mt-3 text-center">
          <Button
            onClick={handleDelete}
            size="sm"
            className="btn-success me-2"
            style={{ width: "135px" }}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            size="sm"
            className="btn-danger"
            style={{ width: "135px" }}
          >
            No
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
