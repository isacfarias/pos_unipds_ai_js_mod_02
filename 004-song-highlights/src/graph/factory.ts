import { LLMModelService } from '../services/llmModelService.ts';
import { config } from '../config.ts';
import { buildChatGraph } from './graph.ts';

export async function buildGraph() {
  const llmClient = new LLMModelService(config);

  const graph = buildChatGraph(
    llmClient,
  );

  return {
    graph,
    memoryService: {
      store: {
        search: (arg1: any, arg2: any) => Promise.resolve([])
      }
    },
  };
}

export const graph = async () => buildGraph();
export default graph;
