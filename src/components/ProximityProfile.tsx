
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, MapPin, GraduationCap } from "lucide-react"

interface ProximityProfileProps {
  user: {
    id: string
    name: string
    avatar?: string
    level: string
    school: string
    distance: number
    interests: string[]
  }
  onMessage: (userId: string) => void
}

export function ProximityProfile({ user, onMessage }: ProximityProfileProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <GraduationCap className="w-4 h-4 mr-1" />
              {user.level} - {user.school}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1 text-primary" />
          À {user.distance}m de vous
        </div>
        
        <div className="flex flex-wrap gap-1">
          {user.interests.map((interest) => (
            <Badge key={interest} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
        </div>

        <Button 
          className="w-full"
          onClick={() => onMessage(user.id)}
          size="sm"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Envoyer un message
        </Button>
      </CardContent>
    </Card>
  )
}
