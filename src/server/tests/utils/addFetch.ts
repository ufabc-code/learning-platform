import { app } from './app'
import request from 'supertest'

export function addFetch(context: unknown) {
  function parse(...data: unknown[]) {
    return {
      url: data[0] as string,
      method: (data[1] as { method: string }).method,
      body: (data[1] as { body: string }).body,
      headers: (data[1] as { headers: Record<string, string> }).headers
    }
  }

  const G = context as { fetch: (data: unknown[]) => void }
  G.fetch = async (...data: unknown[]) => {
    const { url, method, body, headers } = parse(...data)

    const endpoint = url.replace('http://localhost:3000', '')

    if (method === 'POST') {
      const response = await request(app).post(endpoint).set(headers).send(body)
      return {
        json: async () => {
          return response.body
        }
      }
    }

    if (method === 'GET') {
      const response = await request(app).get(endpoint).set(headers).send(body)
      return {
        json: async () => {
          return response.body
        }
      }
    }
  }
}
