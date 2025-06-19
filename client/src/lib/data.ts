
export const askGenai = async (prompt: any) => {
  const response = await fetch(`/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt,
    })
  })

  const data = await response.json();
  return data
}