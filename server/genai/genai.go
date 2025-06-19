package genai

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"google.golang.org/genai"
)

type GenaiService struct {
	geminiClient *genai.Client
	model        string
}

var (
	decisionService = &GenaiService{}
	ctx             = context.Background()
)

func InitializeGenai() *GenaiService {
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Fatal("Err loading .env file")
	}

	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  os.Getenv("GEMINI_API_KEY"),
		Backend: genai.BackendGeminiAPI,
	})

	if err != nil {
		log.Fatal(err)
	}

	decisionService.geminiClient = client

	return decisionService
}

func PromptGenai(prompt string) string {
	result, err := decisionService.geminiClient.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash",
		genai.Text(prompt),
		nil,
	)

	if err != nil {
		log.Fatal(err)
	}

	return result.Text()
}
