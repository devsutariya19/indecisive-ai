package handler

import (
	"fmt"
	"llm-api/genai"
	"net/http"

	"github.com/gin-gonic/gin"
)

// type Option struct {
// 	id   string   `json:"id"`
// 	name string   `json:"name"`
// 	pros []string `json:"pros"`
// 	cons []string `json:"cons"`
// }

// type Decision struct {
// 	id       string   `json:"id"`
// 	question string   `json:"question"`
// 	context  string   `json:"context"`
// 	options  []Option `json:"options"`
// }

type PromptRequest struct {
	Prompt string `json:"prompt" binding:"required"`
}

func GetGenaiResponse(c *gin.Context) {
	var promptRequest PromptRequest
	if err := c.ShouldBindJSON(&promptRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	r := genai.PromptGenai(promptRequest.Prompt)
	fmt.Println(r)

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"result": r,
	})
}
