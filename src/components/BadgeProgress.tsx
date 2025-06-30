
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Target } from "lucide-react"

interface BadgeProgressProps {
  totalBadges: number
  earnedBadges: number
  categoryBreakdown: {
    category: string
    earned: number
    total: number
  }[]
}

export function BadgeProgress({ totalBadges, earnedBadges, categoryBreakdown }: BadgeProgressProps) {
  const progressPercentage = (earnedBadges / totalBadges) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold">Progression des badges</h3>
        </div>
        <Badge variant="secondary">
          {earnedBadges}/{totalBadges}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Badges obtenus</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categoryBreakdown.map((category) => (
          <div key={category.category} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium capitalize">
                {category.category.replace('-', ' ')}
              </span>
              <span className="text-xs text-gray-500">
                {category.earned}/{category.total}
              </span>
            </div>
            <Progress 
              value={(category.earned / category.total) * 100} 
              className="h-1"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
