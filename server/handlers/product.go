package handlers

import (
	"context"
	"fmt"
	"net/http"

	productdto "nutech/dto/product"
	dto "nutech/dto/result"
	"nutech/models"
	"nutech/repositories"

	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)


type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) FindProducts(c echo.Context) error {
	products, err := h.ProductRepository.FindProducts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "failed", Message: err.Error()})
	}

	for i, p := range products {
		products[i].Image =   p.Image
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{
		Status: "Success",
		Data:   products})
}

func (h *handlerProduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}


	return c.JSON(http.StatusOK, dto.SuccesResult{
		Status: "Success",
		Data:   product})
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	dataFile := c.Get("dataFile").(string)

	buyPrice, _ := strconv.Atoi(c.FormValue("buy_price"))
	sellPrice, _ := strconv.Atoi(c.FormValue("sell_price"))
	stock, _ := strconv.Atoi(c.FormValue("stock"))
	name := c.FormValue("name")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "nutech"})

	request := productdto.ProductRequest{
		Name: name,
		BuyPrice: buyPrice,
		SellPrice: sellPrice,
		Stock: stock,
		Image: dataFile,
	}

	validation := validator.New()
	errValid := validation.Struct(request)
	if errValid != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "failed", Message: err.Error()})
	}

	product := models.Product{
		Name: request.Name,
		BuyPrice: request.BuyPrice,
		SellPrice: request.SellPrice,
		Stock: request.Stock,
		Image: resp.SecureURL,
	}

	product, err = h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "failed", Message: err.Error()})
	}

	product, _ = h.ProductRepository.GetProduct(product.ID)

	response := dto.SuccesResult{Status: "success", Data: product}
	return c.JSON(http.StatusOK, response)
}

func (h *handlerProduct) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "failed", Message: err.Error()})
	}

	data, err := h.ProductRepository.DeleteProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Status: "success", Data: data})
}

func (h *handlerProduct) UpdateProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "failed", Message: "Invalid ID! Please input id as number."})
	}

	buyPrice, _ := strconv.Atoi(c.FormValue("buy_price"))
	sellPrice, _ := strconv.Atoi(c.FormValue("sell_price"))
	stock, _ := strconv.Atoi(c.FormValue("stock"))
	name := c.FormValue("name")
	dataFile := c.Get("dataFile").(string)

	request := productdto.ProductRequest{
		Name:  name,
		BuyPrice: buyPrice,
		SellPrice: sellPrice,
		Stock: stock,
		Image: dataFile,
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	if err != nil {
		fmt.Println(err.Error())
	}

	if request.Name != "" {
		product.Name = request.Name
	}

	if request.BuyPrice != 0 {
		product.BuyPrice = request.BuyPrice
	}

	if request.SellPrice != 0 {
		product.SellPrice = request.SellPrice
	}

	if request.Stock != 0 {
		product.Stock = request.Stock
	}

	if request.Image != "" {
		product.Image = request.Image
	}

	data, err := h.ProductRepository.UpdateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Status: "Success", Data: data})
}