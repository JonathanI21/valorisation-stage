
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Eye, Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

interface ExperienceCardProps {
  id: string
  title: string
  company: string
  location: string
  duration: string
  description: string
  author: {
    name: string
    avatar?: string
  }
  tags: string[]
  viewCount: number
  messageCount: number
  thumbnail?: string
}

export function ExperienceCard({
  id,
  title,
  company,
  location,
  duration,
  description,
  author,
  tags,
  viewCount,
  messageCount,
  thumbnail
}: ExperienceCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{author.name}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {duration}
              </div>
            </div>
          </div>
        </div>
        
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {company}, {location}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {thumbnail && (
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img 
              src={`https://images.unsplash.com/${thumbnail}?w=400&h=200&fit=crop`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {viewCount}
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {messageCount}
            </div>
          </div>
          
          <Link to={`/experience/${id}`}>
            <Button size="sm" className="group-hover:shadow-md transition-shadow">
              Voir l'expérience
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
