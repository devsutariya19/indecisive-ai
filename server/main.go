package main

import (
	"genai-api/genai"
	"genai-api/handler"
	ratelimiter "genai-api/rate-limiter"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.SetTrustedProxies(nil)

	api := router.Group("/api")
	api.Use(ratelimiter.RateLimiterService("8-M", "200-D"))

	api.POST("/genai", func(ctx *gin.Context) {
		handler.GetGenaiResponse(ctx)
	})

	api.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"health":  "Online",
			"service": "genai-api",
		})
	})

	router.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "Custom 404: Route not found",
		})
	})

	genai.InitializeGenai()

	port := os.Getenv("GO_PORT")
	router.Run(":" + port)
}
