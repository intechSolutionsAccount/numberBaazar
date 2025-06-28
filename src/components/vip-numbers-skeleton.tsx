
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function VIPNumbersSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
