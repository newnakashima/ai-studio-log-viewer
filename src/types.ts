export interface LogEntry {
  request: {
    model: string;
    contents: Array<{
      parts: Array<{ text: string }>;
      role: "user" | "model";
    }>;
    generationConfig: {
      temperature: number;
      responseMimeType: string;
    };
    systemInstruction?: {
      parts: Array<{ text: string }>;
      role: string;
    };
  };
  response: Array<{
    candidates: Array<{
      content: {
        parts: Array<{ text: string }>;
        role: string;
      };
      finishReason: string;
    }>;
    usageMetadata: {
      promptTokenCount: number;
      candidatesTokenCount: number;
      totalTokenCount: number;
    };
  }>;
  turnId: string;
  datasetIds: string[];
  createTime: string;
  responseStatus: unknown[];
}

export interface Replacement {
  search: string;
  replace: string;
}
