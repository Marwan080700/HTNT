package productdto

// Request
type ProductRequest struct {
	Image     string    `json:"image" gorm:"type: varchar(255)" form:"image"`
	Name      string    `json:"name" gorm:"type: varchar(255)" form:"name"`
	SellPrice int       `json:"sell_price" gorm:"type: int" form:"sell_price"`
	BuyPrice  int       `json:"buy_price" gorm:"type: int" form:"buy_price"`
	Stock 	  int 		`json:"stock" gorm:"type: int" form:"stock"`
}

// Response
type ProductResponse struct {
	Image     string    `json:"image" gorm:"type: varchar(255)" form:"image"`
	Name      string    `json:"name" gorm:"type: varchar(255)" form:"name"`
	SellPrice int       `json:"sell_price" gorm:"type: int" form:"sell_price"`
	BuyPrice  int       `json:"buy_price" gorm:"type: int" form:"buy_price"`
	Stock 	  int 		`json:"stock" gorm:"type: int" form:"stock"`
}
