import { useMemo } from "react";
import { FileUpload } from "@/components/FileUpload";
import { SearchReplace } from "@/components/SearchReplace";
import { ChatView } from "@/components/ChatView";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { parseJSONL } from "@/lib/parser";
import type { Replacement } from "@/types";
import "./index.css";

export function App() {
  const [fileContent, setFileContent] = useLocalStorage<string>("logviewer-file", "");
  const [fileName, setFileName] = useLocalStorage<string>("logviewer-filename", "");
  const [replacements, setReplacements] = useLocalStorage<Replacement[]>("logviewer-replacements", []);

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
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-4">
      <h1 className="text-xl font-bold">AI Studio Log Viewer</h1>
      <FileUpload onFileLoad={handleFileLoad} currentFileName={fileName || undefined} />
      <SearchReplace replacements={replacements} onReplacementsChange={setReplacements} />
      <ChatView entries={entries} replacements={replacements} />
    </div>
  );
}

export default App;
