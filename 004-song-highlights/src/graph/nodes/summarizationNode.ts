import { LLMModelService } from '../../services/llmModelService.ts';
import type { GraphState } from '../graph.ts';

export function createSummarizationNode(llmClient: LLMModelService) {
    return async (state: GraphState): Promise<Partial<GraphState>> => {

        return {
            ...state,
        };
    };
}
