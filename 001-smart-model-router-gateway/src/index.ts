import { config } from "./config.ts";
import { createServer } from "./server.ts";
import { OpenRouterService } from "./openrouterService.ts";

const routerService = new OpenRouterService(config)
const app = createServer(routerService)

await app.listen({ port: config.port, host: '0.0.0.0' })

console.info('Server runinng at 3000')

/*
app.inject({
    method: 'POST',
    url: '/chat',
    body: { question: 'Hello word' }    
}).then( (response) => {
    console.log( 'Response status', response.statusCode)
    console.log( 'Response body', response.body)
})
    */