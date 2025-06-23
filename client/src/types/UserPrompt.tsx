export interface UserPrompt {
  id: string
  question: string
  context: string
  options: Option[]
}

export interface Option {
  id: string
  name: string
  pros: string[]
  cons: string[]
}