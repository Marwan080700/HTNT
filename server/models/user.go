package models

type User struct {
	ID       int    `json:"id" gorm:"primaryKey:autoIncrement"`
	UserName string `json:"username" form:"username" gorm:"type: varchar(255)"`
	Email    string `json:"email" form:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" form:"password" gorm:"type: varchar(255)"`
}
