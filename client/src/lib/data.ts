import { http } from "./constants"

export async function askGenai(prompt: any): Promise<any> {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const response = await fetch(`/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
        })
      })

      if (response.status === http.TOO_MANY_REQUESTS) {
        const body = await response.json()
        reject({
          message: body.message
        })
        return
      }

      if (!response.ok) {
        reject({
          message: "Internal Server Error"
        })
      }

      const data = await response.json()
      resolve(data)
    } catch (err) {
      reject({
        error: err
      })
    }
  })
}