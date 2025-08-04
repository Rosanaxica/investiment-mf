import { Card, CardContent } from '../components/ui/card';
import { TrendingUp, DollarSign, BarChart3, Target } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Loading */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="h-10 w-64 bg-muted animate-pulse rounded"></div>
            <div className="h-4 w-96 bg-muted animate-pulse rounded mt-2"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
            <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
          </div>
        </div>

        {/* Stats Cards Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-muted rounded-lg animate-pulse">
                    <div className="w-6 h-6 bg-muted-foreground/20 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 w-20 bg-muted animate-pulse rounded mb-2"></div>
                    <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Loading */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-3">
                <div className="h-9 w-20 bg-muted animate-pulse rounded"></div>
                <div className="h-9 w-20 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
            </div>
          </CardContent>
        </Card>

        {/* Investments List Loading */}
        <Card>
          <div className="p-6 border-b border-border bg-muted/50">
            <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-5 w-32 bg-muted animate-pulse rounded"></div>
                        <div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
                      </div>
                      <div className="h-4 w-24 bg-muted animate-pulse rounded mb-2"></div>
                      <div className="h-3 w-20 bg-muted animate-pulse rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-5 w-24 bg-muted animate-pulse rounded mb-2"></div>
                      <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 