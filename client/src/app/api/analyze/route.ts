import { API_ENDPOINTS, http } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();

    const response = await fetch(`${API_ENDPOINTS.GENAI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: reqData.prompt,
      })
    })

    if (response.status === http.TOO_MANY_REQUESTS) {
      const body = await response.json()
      return NextResponse.json({
        message: body.message
      }, {status: http.TOO_MANY_REQUESTS})
    }

    if (!response.ok) {
      return NextResponse.json({
        message: "Internal Server Error"
      }, {status: http.INTERNAL_SERVER_ERROR})
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({error: 'Failed to analyze request'}, {status: http.BAD_REQUEST})
  }
}