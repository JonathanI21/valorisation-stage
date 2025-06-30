import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, MessageCircle, Eye, Calendar, MapPin, Play, Download, Award } from "lucide-react"

export default function ExperienceDetail() {
  const { id } = useParams()
  const [currentSection, setCurrentSection] = useState(0)

  // Mock data - dans une vraie app, ces données viendraient d'une API
  const experience = {
    id: "1",
    title: "Stage en Développement Web chez TechCorp",
    company: "TechCorp",
    location: "Paris",
    duration: "3 mois",
    description: "Une expérience enrichissante dans le développement d'applications web modernes. J'ai travaillé sur des projets React et Node.js, appris les bonnes pratiques du développement en équipe et découvert l'univers des startups technologiques.",
    author: {
      name: "Marie Dubois",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      bio: "Étudiante en Master Informatique à l'Université Paris Diderot"
    },
    tags: ["Développement", "React", "Node.js", "Startup"],
    viewCount: 234,
    messageCount: 12,
    createdAt: "Il y a 2 semaines",
    badges: [
      {
        id: "1",
        name: "Première expérience professionnelle",
        level: "bronze",
        icon: "🏢"
      },
      {
        id: "2",
        name: "Communicateur expert",
        level: "silver",
        icon: "💬"
      }
    ],
    plan: [
      {
        id: 1,
        title: "Présentation de l'entreprise",
        content: "TechCorp est une startup française spécialisée dans le développement d'applications web pour les PME. L'entreprise compte 25 employés et est située dans le 11ème arrondissement de Paris. L'ambiance y est décontractée mais professionnelle, avec une culture d'entreprise axée sur l'innovation et la collaboration.",
        completed: true
      },
      {
        id: 2,
        title: "Missions et responsabilités",
        content: "Mes principales missions consistaient à développer des fonctionnalités pour l'application principale de l'entreprise, participer aux réunions de planification Agile, effectuer des tests unitaires, et contribuer à la documentation technique. J'ai également eu l'opportunité de présenter mes travaux lors des démonstrations hebdomadaires.",
        completed: true
      },
      {
        id: 3,
        title: "Compétences acquises",
        content: "J'ai considérablement amélioré mes compétences en React et découvert l'écosystème Node.js. J'ai appris à utiliser MongoDB, Docker, et les principes de l'architecture microservices. Les soft skills n'ont pas été en reste : communication en équipe, gestion du temps, et présentation de projets.",
        completed: true
      },
      {
        id: 4,
        title: "Environnement de travail",
        content: "L'environnement de travail était très moderne avec des espaces ouverts, une salle de détente avec baby-foot, et la possibilité de télétravail 2 jours par semaine. L'équipe était composée de développeurs expérimentés toujours prêts à aider. Les outils utilisés incluaient Slack, Jira, et GitLab.",
        completed: true
      },
      {
        id: 5,
        title: "Conseils pour futurs stagiaires",
        content: "N'hésitez pas à poser des questions, même si elles vous semblent basiques. Impliquez-vous dans les projets et proposez vos idées. Préparez-vous techniquement sur React et JavaScript avant d'arriver. Enfin, profitez de l'expérience pour créer un réseau professionnel solide.",
        completed: true
      }
    ],
    mediaFiles: [
      {
        id: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
        title: "Espace de travail",
        description: "Vue de l'open space où j'ai travaillé"
      },
      {
        id: 2,
        type: "image",
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
        title: "Équipe de développement",
        description: "Photo de l'équipe lors d'une réunion"
      },
      {
        id: 3,
        type: "video",
        url: "#",
        title: "Démonstration de projet",
        description: "Vidéo de ma présentation finale"
      }
    ]
  }

  const completedSections = experience.plan.filter(section => section.completed).length
  const progressPercentage = (completedSections / experience.plan.length) * 100

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-amber-600'
      case 'silver': return 'bg-gray-400'
      case 'gold': return 'bg-yellow-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour aux expériences
          </Button>
        </Link>
      </div>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3">{experience.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {experience.company}, {experience.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {experience.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {experience.viewCount} vues
                </div>
              </div>

              <p className="text-gray-600 mb-4">{experience.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {experience.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Badges obtenus */}
              {experience.badges.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Badges obtenus pour cette expérience
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.badges.map((badge) => (
                      <div key={badge.id} className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg px-3 py-2">
                        <div className={`w-6 h-6 rounded-full ${getLevelColor(badge.level)} flex items-center justify-center text-xs`}>
                          {badge.icon}
                        </div>
                        <span className="text-sm font-medium">{badge.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {badge.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progression du contenu</span>
                  <span>{completedSections}/{experience.plan.length} sections</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={experience.author.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                  {experience.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h3 className="font-semibold">{experience.author.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{experience.author.bio}</p>
                <p className="text-xs text-gray-400">Publié {experience.createdAt}</p>
              </div>

              <Button className="w-full flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Poser une question
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="plan" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="plan">Plan de présentation</TabsTrigger>
              <TabsTrigger value="media">Supports multimédias</TabsTrigger>
            </TabsList>

            <TabsContent value="plan" className="space-y-4">
              {experience.plan.map((section, index) => (
                <Card 
                  key={section.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    currentSection === index ? 'ring-2 ring-primary' : 'hover:shadow-md'
                  }`}
                  onClick={() => setCurrentSection(index)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experience.mediaFiles.map((file) => (
                  <Card key={file.id} className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      {file.type === 'image' ? (
                        <img 
                          src={file.url} 
                          alt={file.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Play className="w-12 h-12 text-gray-400" />
                          <span className="text-sm text-gray-500">Cliquez pour lire</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-1">{file.title}</h4>
                      <p className="text-sm text-gray-600">{file.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navigation rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {experience.plan.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    currentSection === index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {index + 1}. {section.title}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Download className="w-4 h-4" />
                Télécharger le PDF
              </Button>
              <Button variant="outline" className="w-full">
                Partager l'expérience
              </Button>
              <Button variant="outline" className="w-full">
                Signaler un contenu
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Vues</span>
                <span className="font-medium">{experience.viewCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Questions</span>
                <span className="font-medium">{experience.messageCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sections complétées</span>
                <span className="font-medium">{completedSections}/{experience.plan.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Badges obtenus</span>
                <span className="font-medium">{experience.badges.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
