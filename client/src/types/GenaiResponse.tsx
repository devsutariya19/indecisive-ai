export interface GenaiResponse {
  question: string
  recommended_choice: string
  confidence: number
  reason_for: string
  reason_against: string
  key_considerations: string
}