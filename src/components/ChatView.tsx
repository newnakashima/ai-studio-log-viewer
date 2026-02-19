import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LogEntry, Replacement } from "@/types";
import { applyReplacements } from "@/lib/parser";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatViewProps {
  entry: LogEntry | null;
  replacements: Replacement[];
}

export function ChatView({ entry, replacements }: ChatViewProps) {
  if (!entry) {
    return (
      <div className="text-center text-muted-foreground py-12">
        会話を選択してください
      </div>
    );
  }

  const transform = (text: string) => applyReplacements(text, replacements);
  const time = new Date(entry.createTime).toLocaleString("ja-JP");
  const finalResponse = entry.response?.[entry.response.length - 1]
    ?.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {time}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
                    <div className="text-sm markdown-body">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{transform(text)}</ReactMarkdown>
                    </div>
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
                <div className="text-sm markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{transform(finalResponse)}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
