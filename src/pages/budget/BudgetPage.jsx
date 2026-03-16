import { useState } from "react";
import { useParams } from "react-router-dom";
import { BudgetTable } from "../../components/budget/BudgetTable";
import { Receipt, Loader2, PlayCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useGetBudgetItems } from "../../redux/hooks/budget/useGetBudgetItems";

export function BudgetPage() {
  const { projectId } = useParams();
  const { refetch } = useGetBudgetItems();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBudget = async () => {
    if (!projectId) return;
    try {
      setIsGenerating(true);
      const res = await fetch(
        `http://localhost:8000/budget/${projectId}/generate_from_masks`,
        {
          method: "POST",
        },
      );
      if (!res.ok) throw new Error("Failed to generate budget");
      await refetch();
    } catch (err) {
      console.error("Error generating budget:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Receipt className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Budget</h1>
            <p className="text-sm text-muted-foreground">
              Manage procurement budget items
            </p>
          </div>
        </div>

        <Button
          onClick={handleGenerateBudget}
          disabled={isGenerating}
          className="gap-2"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <PlayCircle className="h-4 w-4" />
          )}
          {isGenerating ? "Generating..." : "Create Budget"}
        </Button>
      </div>

      {/* Budget Table — always visible */}
      <BudgetTable projectId={projectId} />
    </div>
  );
}
