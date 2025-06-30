import { useState } from "react"
import { ExperienceCard } from "@/components/ExperienceCard"
import { JobSectorFilter } from "@/components/JobSectorFilter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, TrendingUp, SlidersHorizontal } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const mockExperiences = [
  {
    id: "1",
    title: "Stage d'observation en pharmacie",
    company: "Pharmacie Martin",
    location: "Toulouse",
    duration: "1 semaine",
    description: "Découverte du métier de pharmacien pendant ma 3ème. J'ai pu observer la préparation des médicaments, l'accueil des clients et comprendre l'importance de ce métier de santé dans notre quotidien.",
    author: {
      name: "Emma Dupont",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face"
    },
    tags: ["3ème", "Santé", "Pharmacie", "Découverte"],
    viewCount: 89,
    messageCount: 5,
    thumbnail: "photo-1576091160399-112ba8d25d1f"
  },
  {
    id: "2",
    title: "Une semaine chez un vétérinaire",
    company: "Clinique Vétérinaire des Pins",
    location: "Lyon",
    duration: "1 semaine",
    description: "Stage de 3ème formidable ! J'ai assisté à des consultations, vu des opérations et appris les gestes pour soigner les animaux. Une expérience qui m'a confortée dans mon envie de devenir vétérinaire.",
    author: {
      name: "Lucas Moreau",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    tags: ["3ème", "Animaux", "Vétérinaire", "Médical"],
    viewCount: 124,
    messageCount: 8,
    thumbnail: "photo-1516734212186-a967f81ad0d7"
  },
  {
    id: "3",
    title: "Découverte du métier d'institutrice",
    company: "École primaire Jean Moulin",
    location: "Marseille",
    duration: "1 semaine",
    description: "J'ai passé une semaine dans une classe de CP pour découvrir le métier d'enseignante. Préparation des cours, aide aux devoirs, surveillance... un métier passionnant mais exigeant !",
    author: {
      name: "Léa Bernard",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    tags: ["3ème", "Éducation", "Enseignement", "Enfants"],
    viewCount: 67,
    messageCount: 3,
    thumbnail: "photo-1497486751825-1233686d5d80"
  }
]

const popularTags = ["3ème", "Santé", "Éducation", "Commerce", "Artisanat", "Bureau"]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredExperiences = mockExperiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || exp.tags.includes(selectedTag)
    
    // Simple sector matching based on experience content
    const matchesSector = !selectedSector || 
      (selectedSector === "Santé et Social" && (exp.title.includes("pharmacie") || exp.title.includes("vétérinaire"))) ||
      (selectedSector === "Éducation et Formation" && exp.title.includes("institutrice")) ||
      (selectedSector === "Commerce et Vente" && exp.tags.includes("Commerce")) ||
      (selectedSector === "Artisanat et Métiers d'Art" && exp.tags.includes("Artisanat")) ||
      (selectedSector === "Administration et Bureautique" && exp.tags.includes("Bureau")) ||
      (selectedSector === "Industrie et Technique" && exp.tags.includes("Technique"))
    
    return matchesSearch && matchesTag && matchesSector
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Découvre des expériences de stage inspirantes
        </h1>
        <p className="text-lg text-gray-600">
          Lis les témoignages d'autres collégiens et lycéens pour t'inspirer dans tes choix d'orientation
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher par métier, lieu, classe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtres par métiers
        </Button>
      </div>

      {/* Collapsible Filters */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent>
          <div className="border rounded-lg p-4 bg-gray-50">
            <JobSectorFilter 
              selectedSector={selectedSector}
              onSectorChange={setSelectedSector}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

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

      {/* Active Filters Display */}
      {(selectedSector || selectedTag) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">Filtres actifs:</span>
          {selectedSector && (
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedSector(null)}>
              {selectedSector} ×
            </Badge>
          )}
          {selectedTag && (
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedTag(null)}>
              {selectedTag} ×
            </Badge>
          )}
        </div>
      )}

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
            Essaie de modifier tes critères de recherche ou filtres
          </p>
        </div>
      )}
    </div>
  )
}
