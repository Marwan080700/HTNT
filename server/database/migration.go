package database

import (
	"fmt"
	"nutech/models"
	"nutech/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.Product{},
		&models.User{})

	if err != nil {
		panic(err)
	}

	fmt.Println("Migration Succes")
}
