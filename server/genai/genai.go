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
	err := godotenv.Load()
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
	config := &genai.GenerateContentConfig{
		SystemInstruction: genai.NewContentFromText(`
			You are an intelligent decision-making assistant. 
			Your goal is to analyze the provided question, context, and options, then give a clear, concise recommendation.
			Use critical thinking to synthesize insights beyond just restating pros and cons, considering real-world implications, 
			trade-offs, and human behavior. Give a confidence number based on how certain you are on the decision with the impact.

			Please respond ONLY with the following, in this exact format:
			Question: <original question asked>
			Recommended Choice: <option name from list>
			Confidence: <number between 0-100>%%
			Reason For: <two short sentences explaining why>
			Reason Against: <two short sentences explaining why not>

			No extra explanation or paragraphs. Keep explanations brief and clear (2-3 sentences max)

			"Respond with valid JSON only. Do not include Markdown formatting, triple backticks, or any explanation. The response must be a pure JSON object."
			{
				"question": "<initial question"
				"recommended_choice": "<recommended choice>",
				"confidence": <confidence as percentage>,
				"reason_for": "<reason supporting this choice>",
				"reason_against": "<reason against this choice>"
			}
		`, genai.RoleUser),
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
