package handler

import (
	"encoding/json"
	"fmt"
	"genai-api/genai"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type GenaiResponse struct {
	Question          string `json:"question"`
	RecommendedChoice string `json:"recommended_choice"`
	Confidence        int    `json:"confidence"`
	ReasonFor         string `json:"reason_for"`
	ReasonAgainst     string `json:"reason_against"`
	KeyConsiderations string `json:"key_considerations"`
}

type PromptRequest struct {
	Prompt string `json:"prompt" binding:"required"`
}

func GetGenaiResponse(c *gin.Context) {
	var promptRequest PromptRequest
	if err := c.ShouldBindJSON(&promptRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	prompt := fmt.Sprintf(`
		%s

		Please recommend the best option.
	`, promptRequest.Prompt)

	r := genai.PromptGenai(prompt)

	var response GenaiResponse
	if err := json.Unmarshal([]byte(cleanJSONResponse(r)), &response); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"result": response,
	})
}

func cleanJSONResponse(raw string) string {
	raw = strings.TrimSpace(raw)
	raw = strings.TrimPrefix(raw, "```json")
	raw = strings.TrimPrefix(raw, "```")
	raw = strings.TrimSuffix(raw, "```")
	return strings.TrimSpace(raw)
}
