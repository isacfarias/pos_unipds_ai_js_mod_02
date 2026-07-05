import { 
    StateGraph,
    MessagesZodMeta,
    START,
    END,
} from '@langchain/langgraph'
import { withLangGraph } from '@langchain/langgraph/zod'
import { BaseMessage } from 'langchain'
import { z } from 'zod/v3'
import { identifyIntent } from './nodes/identifyIntentNode.ts'
import { chatResponseNode } from './nodes/chatResponseNode.ts'


const GraphState = z.object({
    messages: withLangGraph(
        z.custom<BaseMessage[]>(),
        MessagesZodMeta),
    output: z.string(),
    command: z.enum(['uppercase', 'lowercase', 'unknown'])     
})

export type GraphState = z.infer<typeof GraphState>

export function buildGraph() {
    const workflow = new StateGraph({
        stateSchema: GraphState
    })
    .addNode("identifyIntent", identifyIntent)
    .addNode("chatResponse", chatResponseNode)

    /*
    .addNode("identifyIntent", (state: GraphState) => {

        return {
            ...state
        }
    })
    */
    .addEdge(START, "identifyIntent")
    .addEdge("identifyIntent", "chatResponse")
    .addEdge("chatResponse", END)

    return workflow.compile()
}