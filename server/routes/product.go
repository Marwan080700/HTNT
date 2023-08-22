package routes

import (
	"nutech/handlers"
	"nutech/pkg/middleware"
	"nutech/pkg/mysql"
	"nutech/repositories"

	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Group) {
	r := repositories.RepositoryProduct(mysql.DB)
	h := handlers.HandlerProduct(r)

	e.GET("/products", h.FindProducts)
	e.GET("/product/:id", h.GetProduct)
	e.POST("/product", middleware.UploadFile(h.CreateProduct))
	e.DELETE("/product/:id", h.DeleteProduct)
	e.PATCH("/product/:id", middleware.UploadFile(h.UpdateProduct))
}
