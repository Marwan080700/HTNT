import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productSelectors,
  updateProduct,
} from "../../Slice/productSlice";

function ModalEditProduct({ show, showEditProduct, id }) {
  const handleClose = () => showEditProduct(false);

  const dispatch = useDispatch();

  const product = useSelector((state) =>
    productSelectors.selectById(state, id)
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [id]);

  const [form, setForm] = useState({
    name: "",
    sell_price: "",
    buy_price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    setForm({
      ...form,
      name: product?.name,
      sell_price: product?.sell_price,
      buy_price: product?.buy_price,
      stock: product?.stock,
      image: product?.image,
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleUpdate = async (e) => {
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
    if (form.image) {
      formData.set("image", form?.image, form?.image?.name);
    }
    await dispatch(updateProduct({ id, formData, config }));
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <h3 className="text-center">Perbaharui Produk</h3>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form?.name}
                onChange={handleChange}
                placeholder="Nama Produk"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Harga Beli</Form.Label>
              <Form.Control
                type="number"
                name="buy_price"
                value={form?.buy_price}
                onChange={handleChange}
                placeholder="Harga Beli"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control
                type="number"
                name="sell_price"
                value={form?.sell_price}
                onChange={handleChange}
                placeholder="Harga Jual"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={form?.stock}
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
              Perbaharui Produk
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalEditProduct;
