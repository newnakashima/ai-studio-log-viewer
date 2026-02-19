import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { LogEntry } from "@/types";

interface ConversationListProps {
  entries: LogEntry[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

function getPreviewText(entry: LogEntry): string {
  const userMessage = entry.request.contents.find(c => c.role === "user");
  if (!userMessage) return "(メッセージなし)";
  const text = userMessage.parts.map(p => p.text).join(" ");
  return text.length > 50 ? text.slice(0, 50) + "…" : text;
}

export function ConversationList({ entries, selectedIndex, onSelect }: ConversationListProps) {
  if (entries.length === 0) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        ログがありません
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-1 p-2">
        {entries.map((entry, index) => {
          const time = new Date(entry.createTime).toLocaleString("ja-JP");
          const preview = getPreviewText(entry);
          const isSelected = selectedIndex === index;

          return (
            <button
              key={entry.turnId || index}
              onClick={() => onSelect(index)}
              className={cn(
                "w-full text-left rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent/50",
                isSelected && "bg-sidebar-accent"
              )}
            >
              <p className="font-medium truncate">{preview}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
