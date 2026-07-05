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
import { upperCaseNode } from './nodes/upperCaseNode.ts'
import { lowerCaseNode } from './nodes/lowerCaseNode.ts'


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
        .addNode('upperCase', upperCaseNode)
        .addNode('lowerCase', lowerCaseNode)
        .addConditionalEdges("identifyIntent", (state: GraphState) => {
            switch (state.command) {
                case 'uppercase':
                    return 'upperCase';
                case 'lowercase':
                    return 'lowerCase';
                default:
                    return 'fallback'
            }
        },
        {
            'upperCase': 'upperCase',
            'lowerCase': 'lowerCase',
            //'fallback': 'fallback'
        }
       )
       /*
        .addNode("identifyIntent", (state: GraphState) => {
    
            return {
                ...state
            }
        })
        */
        .addEdge(START, "identifyIntent")
        .addEdge("upperCase", "chatResponse")
        .addEdge("lowerCase", "chatResponse")
        .addEdge("chatResponse", END)

    return workflow.compile()
}