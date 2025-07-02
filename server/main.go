package main

import (
	"genai-api/genai"
	"genai-api/handler"
	ratelimiter "genai-api/rate-limiter"
	"net/http"
	"os"
	"strings"

	"net/http/httputil"
	"net/url"

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
		path := ctx.Request.URL.Path
		host := ctx.Request.Host

		if strings.HasPrefix(path, "/api/") {
			ctx.Status(http.StatusNotFound)
			return
		}

		nextjsUrl := "http://" + host
		proxyUrl, err := url.Parse(nextjsUrl)
		if err != nil {
			ctx.Status(http.StatusInternalServerError)
			return
		}

		proxy := httputil.NewSingleHostReverseProxy(proxyUrl)
		proxy.ServeHTTP(ctx.Writer, ctx.Request)
	})

	genai.InitializeGenai()

	port := os.Getenv("PORT")
	router.Run(":" + port)
}
