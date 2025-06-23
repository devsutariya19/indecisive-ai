package main

import (
	"llm-api/genai"
	"llm-api/handler"
	"net/http"

	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	nextjsUrl, _ := url.Parse("http://localhost:3000")
	proxy := httputil.NewSingleHostReverseProxy(nextjsUrl)

	api := router.Group("/api")

	api.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "gemini-api",
		})
	})

	api.POST("/genai", func(ctx *gin.Context) {
		handler.GetGenaiResponse(ctx)
	})

	router.NoRoute(func(ctx *gin.Context) {
		proxy.ServeHTTP(ctx.Writer, ctx.Request)
	})

	genai.InitializeGenai()

	router.Run()
}
