import { useMemo, useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { SearchReplace } from "@/components/SearchReplace";
import { ChatView } from "@/components/ChatView";
import { ConversationList } from "@/components/ConversationList";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { parseJSONL } from "@/lib/parser";
import type { Replacement } from "@/types";
import { Menu } from "lucide-react";
import "./index.css";

export function App() {
  const [fileContent, setFileContent] = useLocalStorage<string>("logviewer-file", "");
  const [fileName, setFileName] = useLocalStorage<string>("logviewer-filename", "");
  const [replacements, setReplacements] = useLocalStorage<Replacement[]>("logviewer-replacements", []);
  const [selectedIndex, setSelectedIndex] = useLocalStorage<number | null>("logviewer-selected-index", null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const entries = useMemo(() => {
    if (!fileContent) return [];
    try {
      return parseJSONL(fileContent);
    } catch {
      return [];
    }
  }, [fileContent]);

  const handleFileLoad = (content: string, name: string) => {
    setFileContent(content);
    setFileName(name);
    setSelectedIndex(null);
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setSidebarOpen(false);
  };

  const selectedEntry = selectedIndex !== null && entries[selectedIndex] ? entries[selectedIndex] : null;

  const conversationList = (
    <ConversationList
      entries={entries}
      selectedIndex={selectedIndex}
      onSelect={handleSelect}
    />
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-2 border-b px-4 py-2 shrink-0">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="px-4 py-3 border-b">
              <SheetTitle>会話一覧</SheetTitle>
            </SheetHeader>
            {conversationList}
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-bold">AI Studio Log Viewer</h1>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col w-72 border-r shrink-0">
          <div className="px-4 py-3 border-b font-semibold text-sm">会話一覧</div>
          {conversationList}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <FileUpload onFileLoad={handleFileLoad} currentFileName={fileName || undefined} />
          <SearchReplace replacements={replacements} onReplacementsChange={setReplacements} />
          <ChatView entry={selectedEntry} replacements={replacements} />
        </main>
      </div>
    </div>
  );
}

export default App;
