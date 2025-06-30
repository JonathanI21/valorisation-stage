
import { useState } from "react"
import { ExperienceCard } from "@/components/ExperienceCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, TrendingUp } from "lucide-react"

const mockExperiences = [
  {
    id: "1",
    title: "Stage en Développement Web chez TechCorp",
    company: "TechCorp",
    location: "Paris",
    duration: "3 mois",
    description: "Une expérience enrichissante dans le développement d'applications web modernes. J'ai travaillé sur des projets React et Node.js, appris les bonnes pratiques du développement en équipe et découvert l'univers des startups technologiques.",
    author: {
      name: "Marie Dubois",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face"
    },
    tags: ["Développement", "React", "Node.js", "Startup"],
    viewCount: 234,
    messageCount: 12,
    thumbnail: "photo-1498050108023-c5249f4df085"
  },
  {
    id: "2",
    title: "Stage Marketing Digital chez AdAgency",
    company: "AdAgency",
    location: "Lyon",
    duration: "4 mois",
    description: "Immersion complète dans le monde du marketing digital. Création de campagnes publicitaires, analyse de données, gestion des réseaux sociaux et découverte des outils d'automatisation marketing.",
    author: {
      name: "Thomas Martin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    tags: ["Marketing", "Digital", "Réseaux sociaux", "Analytics"],
    viewCount: 189,
    messageCount: 8,
    thumbnail: "photo-1460925895917-afdab827c52f"
  },
  {
    id: "3",
    title: "Stage Ingénieur Logiciel chez InnovateTech",
    company: "InnovateTech",
    location: "Toulouse",
    duration: "6 mois",
    description: "Développement de solutions logicielles pour l'industrie aéronautique. Travail sur des systèmes critiques, apprentissage des normes de qualité et découverte des méthodologies Agile.",
    author: {
      name: "Sophie Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    tags: ["Ingénierie", "Aéronautique", "C++", "Agile"],
    viewCount: 156,
    messageCount: 15,
    thumbnail: "photo-1461749280684-dccba630e2f6"
  }
]

const popularTags = ["Développement", "Marketing", "Design", "Data Science", "Commercial", "RH"]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredExperiences = mockExperiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || exp.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Découvrez des expériences de stage inspirantes
        </h1>
        <p className="text-lg text-gray-600">
          Explorez les témoignages de stagiaires et trouvez l'inspiration pour votre parcours professionnel
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher par entreprise, métier, ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filtres avancés
        </Button>
      </div>

      {/* Popular Tags */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="font-medium">Domaines populaires</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((experience) => (
          <ExperienceCard key={experience.id} {...experience} />
        ))}
      </div>

      {filteredExperiences.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune expérience trouvée
          </h3>
          <p className="text-gray-500">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  )
}
