import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { addProduct } from "../../Slice/productSlice";
import { useDispatch } from "react-redux";

function ModalAddProduct({ show, showAddProduct }) {
  const handleClose = () => showAddProduct(false);

  const [form, setForm] = useState({
    name: "",
    sell_price: "",
    buy_price: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (type === "file" && files[0]) {
      const fileSize = files[0].size / 1024; // File size in KB
      if (fileSize > 100) {
        alert("File size exceeds 100KB. Please choose a smaller file.");
        return; // Don't update the state if the file size is too large
      }
    }

    // File type validation (only PNG and JPG)
    if (type === "file" && files[0]) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(files[0].type)) {
        alert("Invalid file type. Please choose a PNG or JPG image.");
        return; // Don't update the state if the file type is invalid
      }
    }
  };

  const dispatch = useDispatch();

  const AddProduct = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("sell_price", form.sell_price);
    formData.set("buy_price", form.buy_price);
    formData.set("stock", form.stock);
    formData.set("image", form.image[0], form.image[0].name);

    await dispatch(addProduct({ formData, config }));
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={AddProduct}>
            <h3 className="text-center">Tambah Produk</h3>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Nama Produk"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Harga Beli</Form.Label>
              <Form.Control
                type="number"
                name="buy_price"
                onChange={handleChange}
                placeholder="Harga Beli"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control
                type="number"
                name="sell_price"
                onChange={handleChange}
                placeholder="Harga Jual"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                onChange={handleChange}
                placeholder="Stok"
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Gambar Produk</Form.Label>
              <Form.Control type="file" onChange={handleChange} name="image" />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100"
              onClick={handleClose}
            >
              Tambah Produk
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalAddProduct;
