# Backend ⚡

The brains behind the operation - a Go API that talks to Google Gemini so you don't have to figure out your life alone.

## What it does

Takes your messy decision scenarios, cleans them up, sends them to Google's AI, and gives you back some actually helpful analysis. It's like having a really smart friend who's always available.

## The tech choices

- **Go** - Fast, simple, gets the job done
- **Gin** - Web framework that doesn't get in the way
- **Google Gemini** - The AI that does the heavy thinking

## Getting it running

```bash
# Install dependencies
go mod tidy

# Set up your secrets
echo "GEMINI_API_KEY=your_actual_api_key_here" > .env
echo "PORT=8080" >> .env

# Start the server
go run main.go
```

Your API will be humming along at `http://localhost:8080`.

## What you can hit

**POST /api/genai** - Send your decision drama here  
**GET /api/health** - Make sure everything's still working

## The secret sauce (prompt engineering)

Here's where it gets interesting. Instead of just dumping your raw thoughts at the AI, this backend is actually pretty smart about how it talks to Gemini.

It takes your messy decision - the question, the context, all your scattered pros and cons - and turns it into a nicely structured conversation. Think of it like having a good therapist who knows exactly how to frame your problems so you can see them clearly.

The AI gets a clean, organized prompt that makes it way more likely to give you useful advice instead of generic fluff. It's the difference between asking "what should I do?" and laying out the whole situation like you're talking to your most logical friend.

## Environment stuff

- `GEMINI_API_KEY` - Get this from Google (don't commit it!)
- `PORT` - Where the server lives (8080 works fine)
