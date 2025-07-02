import { API_ENDPOINTS, http } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_ENDPOINTS.HEALTH}`)
    
    if (!response.ok) {
      return NextResponse.json({
        message: "Internal Server Error"
      }, {status: http.INTERNAL_SERVER_ERROR})
    }
  
    const data = await response.json();  
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { message: 'Unable to connect to health service' },
      { status: http.BAD_GATEWAY }
    );
  }
}