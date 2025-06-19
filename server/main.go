package main

import (
	"llm-api/genai"
	"llm-api/handler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "gemini-api",
		})
	})

	router.POST("/api/genai", func(ctx *gin.Context) {
		handler.GetGenaiResponse(ctx)
	})

	genai.InitializeGenai()

	router.Run()
}
