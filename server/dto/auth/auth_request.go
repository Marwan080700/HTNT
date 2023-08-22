package authdto

type AuthRequest struct {
	UserName string `json:"username" validate:"required" form:"username"`
	Email    string `json:"email" validate:"required" form:"email"`
	Password string `json:"password" validate:"required" form:"password"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required" form:"email"`
	Password string `json:"password" validate:"required" form:"password"`
}

type LoginResponse struct {
	UserName string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"-"`
	Token    string `json:"token"`
}
