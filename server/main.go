package main

import (
	"genai-api/genai"
	"genai-api/handler"
	ratelimiter "genai-api/rate-limiter"
	"net/http"
	"net/http/httputil"
	"net/url"
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
		nextjsUrl := "http://localhost:3000"

		proxyUrl, err := url.Parse(nextjsUrl)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to set up reverse proxy"})
			return
		}

		proxy := httputil.NewSingleHostReverseProxy(proxyUrl)
		proxy.ServeHTTP(ctx.Writer, ctx.Request)
	})

	genai.InitializeGenai()

	port := os.Getenv("GO_PORT")
	router.Run(":" + port)
}
