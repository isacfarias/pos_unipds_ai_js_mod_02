import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from '../src/server.ts'


console.assert(
    process.env.LANGSMITH_API_KEY,
    'LANGSMITH_API_KEY is not set in env variables'
)

test("routes to cheapest model by default", async () => {
    const app = createServer()
    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: 'Qual o conceito de ratelimit ?' }
    })

    assert.equal(response.statusCode, 200)
})
