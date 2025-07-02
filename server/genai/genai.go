package genai

import (
	"context"
	"genai-api/constants"
	"log"
	"os"

	"github.com/joho/godotenv"
	"google.golang.org/genai"
)

type GenaiService struct {
	geminiClient *genai.Client
}

var (
	decisionService = &GenaiService{}
	ctx             = context.Background()
)

func InitializeGenai() *GenaiService {
	_ = godotenv.Load()

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
	config := &genai.GenerateContentConfig{
		SystemInstruction: genai.NewContentFromText(constants.GenaiSystemPrompt, genai.RoleUser),
	}

	result, err := decisionService.geminiClient.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash",
		genai.Text(prompt),
		config,
	)

	if err != nil {
		log.Fatal(err)
	}

	return result.Text()
}
