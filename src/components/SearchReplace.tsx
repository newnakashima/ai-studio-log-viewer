import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Replacement } from "@/types";

interface SearchReplaceProps {
  replacements: Replacement[];
  onReplacementsChange: (replacements: Replacement[]) => void;
}

export function SearchReplace({ replacements, onReplacementsChange }: SearchReplaceProps) {
  const addPair = () => {
    onReplacementsChange([...replacements, { search: "", replace: "" }]);
  };

  const removePair = (index: number) => {
    onReplacementsChange(replacements.filter((_, i) => i !== index));
  };

  const updatePair = (index: number, field: "search" | "replace", value: string) => {
    const updated = replacements.map((r, i) =>
      i === index ? { ...r, [field]: value } : r
    );
    onReplacementsChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">置換</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {replacements.map((r, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              placeholder="検索文字列"
              value={r.search}
              onChange={(e) => updatePair(i, "search", e.target.value)}
              className="flex-1"
            />
            <span className="text-muted-foreground text-sm">→</span>
            <Input
              placeholder="置換文字列"
              value={r.replace}
              onChange={(e) => updatePair(i, "replace", e.target.value)}
              className="flex-1"
            />
            <Button variant="ghost" size="sm" onClick={() => removePair(i)}>
              ✕
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addPair}>
          + 追加
        </Button>
      </CardContent>
    </Card>
  );
}
