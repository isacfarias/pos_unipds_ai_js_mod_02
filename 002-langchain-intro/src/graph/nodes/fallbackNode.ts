import { AIMessage, SystemMessage } from "langchain";
import { type GraphState } from "../graph.ts";

export function fallbackNode(state: GraphState): GraphState {
    const responseText = "Unknown command. Try 'make this uppercase' or 'convert to lowercase'"
    const fallbackMessage = new AIMessage(responseText).content.toString();
  
    return {
        ...state,
        output: fallbackMessage,
        messages: [
            ...state.messages,
            new SystemMessage('Deu ruim!!')
        ] 
    }
}