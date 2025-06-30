
import { Badge as BadgeType, UserBadge } from "@/types/badges"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Download, ExternalLink, CheckCircle } from "lucide-react"

interface BadgeCardProps {
  badge: BadgeType
  userBadge?: UserBadge
  isEarned?: boolean
  onClaim?: () => void
  onExport?: () => void
}

export function BadgeCard({ badge, userBadge, isEarned = false, onClaim, onExport }: BadgeCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-amber-600'
      case 'silver': return 'bg-gray-400'
      case 'gold': return 'bg-yellow-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <Card className={`relative transition-all duration-300 ${isEarned ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'}`}>
      {isEarned && (
        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full ${getLevelColor(badge.level)} flex items-center justify-center`}>
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{badge.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {badge.level}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {badge.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">{badge.description}</p>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium text-sm mb-1">Critères d'obtention</h4>
          <p className="text-xs text-gray-600">{badge.criteria}</p>
        </div>

        {userBadge && (
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-1">Obtenu le</h4>
            <p className="text-xs text-gray-600">
              {new Date(userBadge.issuedAt).toLocaleDateString('fr-FR')}
            </p>
            {userBadge.evidence && (
              <div className="mt-2">
                <p className="text-xs text-gray-600">{userBadge.evidence.description}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {isEarned ? (
            <Button 
              size="sm" 
              className="flex-1 flex items-center gap-2"
              onClick={onExport}
            >
              <Download className="w-4 h-4" />
              Exporter
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={onClaim}
              disabled={!onClaim}
            >
              Revendiquer
            </Button>
          )}
          
          <Button size="sm" variant="ghost">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
