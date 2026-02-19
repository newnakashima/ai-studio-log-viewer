import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LogEntry, Replacement } from "@/types";
import { applyReplacements } from "@/lib/parser";

interface ChatViewProps {
  entries: LogEntry[];
  replacements: Replacement[];
}

export function ChatView({ entries, replacements }: ChatViewProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        JSONL ファイルをアップロードしてください
      </div>
    );
  }

  const transform = (text: string) => applyReplacements(text, replacements);

  return (
    <div className="space-y-6">
      {entries.map((entry, entryIndex) => {
        const time = new Date(entry.createTime).toLocaleString("ja-JP");
        const systemPrompt = entry.request.systemInstruction?.parts
          .map(p => p.text).join("\n");
        const finalResponse = entry.response?.[entry.response.length - 1]
          ?.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n");

        return (
          <Card key={entry.turnId || entryIndex}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {time}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* System Prompt */}
              {systemPrompt && (
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <p className="text-xs font-medium text-muted-foreground mb-1">システムプロンプト</p>
                  <p className="text-sm whitespace-pre-wrap">{transform(systemPrompt)}</p>
                </div>
              )}

              {/* Conversation Messages */}
              <div className="space-y-3">
                {entry.request.contents.map((content, msgIndex) => {
                  const text = content.parts.map(p => p.text).join("\n");
                  const isUser = content.role === "user";

                  return (
                    <div
                      key={msgIndex}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-xs font-medium mb-1 opacity-70">
                          {isUser ? "ユーザー" : "モデル"}
                        </p>
                        <p className="text-sm whitespace-pre-wrap">{transform(text)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Final Response */}
              {finalResponse && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                    <p className="text-xs font-medium mb-1 text-green-700 dark:text-green-400">最終回答</p>
                    <p className="text-sm whitespace-pre-wrap">{transform(finalResponse)}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
