import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Pagination,
  InputGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  productSelectors,
  deleteProduct,
} from "../Slice/productSlice";
import Edit from "../assets/img/pencil.png";
import Delete from "../assets/img/trash.png";
import search from "../assets/img/searching.png";
import ModalAddProduct from "../components/modal/ModalAddProduct";
import ModalEditProduct from "../components/modal/ModalEditProduct";
import ModalDelete from "../components/modal/ModalDelete";
import Login from "./modal/Login";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

function ListProduct() {
  const [user, setUser] = useState(getUser());

  console.log("user nich", user);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [idProduct, setIdProduct] = useState();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const showProductPerPages = 5;

  const dispatch = useDispatch();
  const products = useSelector(productSelectors.selectAll);

  const formattedPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [currentPage, searchQuery]);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfrimDelete] = useState(null);

  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openLoginModal = () => {
    toast.error("Login Dahulu !!!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setShowLogin(true);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      dispatch(deleteProduct(idDelete));
      setConfrimDelete(null);
    }
  }, [confirmDelete]);

  console.log("ini handlesearch", searchQuery);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * showProductPerPages;
  const indexOfFirstProduct = indexOfLastProduct - showProductPerPages;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / showProductPerPages);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-secondary-subtle mb-3">
      <Container>
        <div className="d-flex justify-content-between align-items-center py-4">
          <InputGroup>
            <img src={search} alt="Search Icon" width={"38px"} />
            <Form.Group className="bg-body rounded">
              <Form.Control
                type="text"
                placeholder="cari produk disini..."
                value={searchQuery}
                onChange={handleChange}
              />
            </Form.Group>
          </InputGroup>
          <>
            <Button
              variant="outline-success fw-bold"
              className="text-right mb-2"
              onClick={() => {
                setShowAddProduct(true);
              }}
              style={{ width: "180px", height: "45px" }}
            >
              Tambah Produk
            </Button>
          </>
        </div>
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="shadow p-3 mb-5 bg-body"
        >
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Gambar</th>
              <th>Nama Produk</th>
              <th>Harga Jual</th>
              <th>Harga Beli</th>
              <th>Stok</th>
              <th>Action</th>
            </tr>
          </thead>
          <>
            <tbody>
              {currentProducts?.map((product, index) => (
                <tr key={product.id} className="text-center">
                  <td>{indexOfFirstProduct + index + 1}</td>
                  <td>
                    <img
                      src={product.image}
                      alt="product"
                      style={{ width: "70px", height: "70px" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{formattedPrice(product.sell_price)}</td>
                  <td>{formattedPrice(product.buy_price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <img
                      src={Edit}
                      className="me-3"
                      width={"25px"}
                      alt="edit"
                      onClick={() => {
                        setShowEditProduct(true);
                        setIdProduct(product.id);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={Delete}
                      className="me-3"
                      width={"30px"}
                      alt="edit"
                      onClick={() => handleDelete(product.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </Table>
        <Pagination className="d-flex justify-content-center align-items-center  pb-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>

      <Login show={showLogin} showLogin={setShowLogin} />

      <ModalAddProduct
        show={showAddProduct}
        showAddProduct={setShowAddProduct}
      />

      <ModalEditProduct
        id={idProduct}
        show={showEditProduct}
        showEditProduct={setShowEditProduct}
      />
      <ModalDelete
        setConfirmDelete={setConfrimDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}

export default ListProduct;
