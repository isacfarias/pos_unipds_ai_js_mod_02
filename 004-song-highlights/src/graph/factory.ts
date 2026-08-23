import { LLMModelService } from '../services/llmModelService.ts';
import { config } from '../config.ts';
import { buildChatGraph } from './graph.ts';
import { createMemoryService } from '../services/memoryService.ts';
import { PreferencesService } from '../services/preferencesService.ts';

export async function buildGraph(dbPath: string = './preferences.db') {
  const llmClient = new LLMModelService(config);
  const preferencesService = new PreferencesService(dbPath)
  const memoryService = await createMemoryService()

  const graph = buildChatGraph(
    llmClient,
    preferencesService,
    memoryService
  );

  return {
    graph,
    preferencesService,
  };
}

export const graph = async () => buildGraph();
export default graph;
