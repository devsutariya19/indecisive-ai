import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();

    const response = await fetch(`http://localhost:8080/api/genai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: reqData.prompt,
      })
    })

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({error: 'Failed to analyze request'}, {status: 400})
  }
}