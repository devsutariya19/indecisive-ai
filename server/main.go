package main

import (
	"genai-api/genai"
	"genai-api/handler"
	ratelimiter "genai-api/rate-limiter"
	"net/http"
	"strings"

	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.SetTrustedProxies(nil)

	nextjsUrl, _ := url.Parse("http://localhost:3000")
	proxy := httputil.NewSingleHostReverseProxy(nextjsUrl)

	api := router.Group("/api")
	api.Use(ratelimiter.RateLimiterService("8-M", "200-D"))

	api.POST("/genai", func(ctx *gin.Context) {
		handler.GetGenaiResponse(ctx)
	})

	api.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "genai-api",
		})
	})

	router.NoRoute(func(ctx *gin.Context) {
		path := ctx.Request.URL.Path
		origin := ctx.GetHeader("Origin")

		if strings.Contains(origin, "localhost:3000") && strings.HasPrefix(path, "/api/") {
			proxy.ServeHTTP(ctx.Writer, ctx.Request)
			return
		}

		ctx.Status(http.StatusNotFound)
	})

	genai.InitializeGenai()

	router.Run()
}
