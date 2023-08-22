package models

import "time"

type Product struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	Image     string    `json:"image" gorm:"type: varchar(255)" form:"image"`
	Name      string    `json:"name" gorm:"type: varchar(255);unique" form:"name"`
	SellPrice int       `json:"sell_price" gorm:"type: int" form:"sell_price"`
	BuyPrice  int       `json:"buy_price" gorm:"type: int" form:"buy_price"`
	Stock 	  int 		`json:"stock" gorm:"type: int" form:"stock"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}