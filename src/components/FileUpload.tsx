import { useCallback, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileLoad: (content: string, fileName: string) => void;
  currentFileName?: string;
}

export function FileUpload({ onFileLoad, currentFileName }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onFileLoad(text, file.name);
    };
    reader.readAsText(file);
  }, [onFileLoad]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <Card
      className={`cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-dashed border-2 hover:border-primary/50"}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <CardContent className="flex flex-col items-center justify-center py-8 gap-2">
        <input
          ref={inputRef}
          type="file"
          accept=".jsonl"
          className="hidden"
          onChange={handleChange}
        />
        <p className="text-muted-foreground text-sm">
          {currentFileName
            ? `現在のファイル: ${currentFileName}`
            : "JSONL ファイルをドラッグ＆ドロップ、またはクリックして選択"}
        </p>
        {currentFileName && (
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
            ファイルを変更
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
