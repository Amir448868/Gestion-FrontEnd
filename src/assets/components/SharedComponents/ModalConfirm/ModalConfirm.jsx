/* eslint-disable react/prop-types */
import "./ModalConfirm.css";
import { Modal, Button } from "react-bootstrap";

function ModalConfirm({
  show,
  handleClose,
  nameProduct,
  idProduct,
  handleDelete,
}) {
  const handleDeleteClick = () => {
    handleDelete(idProduct);
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Eliminar{" "}
            {nameProduct.charAt(0).toUpperCase() +
              nameProduct.slice(1).toLowerCase()}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Seguro quieres eliminar el producto{" "}
          {nameProduct.charAt(0).toUpperCase() +
            nameProduct.slice(1).toLowerCase()}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-custom-blue" onClick={handleClose}>
            Cerrar
          </Button>
          <Button className="btn-custom-red" onClick={handleDeleteClick}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
