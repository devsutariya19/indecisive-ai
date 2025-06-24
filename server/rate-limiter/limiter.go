package ratelimiter

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ulule/limiter/v3"
	memorystore "github.com/ulule/limiter/v3/drivers/store/memory"
)

func RateLimiterService(rateLimits ...string) gin.HandlerFunc {
	var limiters []limiter.Limiter

	for _, rateLimit := range rateLimits {
		rate, err := limiter.NewRateFromFormatted(rateLimit)
		if err != nil {
			panic("Invalid rate format" + rateLimit)
		}

		store := memorystore.NewStore()
		limiters = append(limiters, *limiter.New(store, rate))
	}

	return func(ctx *gin.Context) {
		key := ctx.ClientIP()

		for _, lim := range limiters {
			c := context.Background()
			context, err := lim.Get(c, key)
			if err != nil {
				ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Rate limiter error"})
				return
			}

			if context.Reached {
				ctx.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
					"message": "You've reached the message limit. Please try again later.",
				})
				return
			}
		}
		ctx.Next()
	}
}
