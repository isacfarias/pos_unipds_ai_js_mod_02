import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from '../src/server.ts'
import { config } from "../src/config.ts";
import { OpenRouterService, type LLMResponse } from '../src/openrouterService.ts';

console.assert(
    process.env.OPENROUTER_API_KEY,
    'OPENROUTER_API_KEY is not set in env variables'
)

test("routes to cheapest model by default", async () => {
    const customConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'price'
            }
        }
    }

    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)
    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: 'Qual o conceito de ratelimit ?' }
    })

    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse
    assert.equal(body.model, 'poolside/laguna-xs-2.1-20260625:free')
})

test("routes to highest throughput model by default", async () => {
    const customConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput'
            }
        }
    }

    const routerService = new OpenRouterService(customConfig)
    const app = createServer(routerService)
    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: 'Qual o conceito de ratelimit ?' }
    })

    assert.equal(response.statusCode, 200)
    const body = response.json() as LLMResponse
    assert.equal(body.model, 'nvidia/nemotron-3-nano-30b-a3b:free')
})