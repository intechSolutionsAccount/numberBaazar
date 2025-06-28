
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorFallbackProps {
  error: string;
  onRetry: () => void;
}

export function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent className="flex flex-col items-center text-center p-6">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}
