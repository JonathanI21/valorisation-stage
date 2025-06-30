
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BadgeCard } from "@/components/BadgeCard"
import { BadgeProgress } from "@/components/BadgeProgress"
import { Award, Search, Filter, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Badges() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const { toast } = useToast()

  // Mock data - dans une vraie app, ces données viendraient d'une API
  const availableBadges = [
    {
      id: "1",
      name: "Première expérience professionnelle",
      description: "Réalisation d'un premier stage d'observation avec compte-rendu complet",
      icon: "🏢",
      criteria: "Avoir effectué un stage d'au moins 5 jours et publié une expérience détaillée",
      issuer: {
        name: "MesStages",
        url: "https://messtages.fr",
        email: "badges@messtages.fr"
      },
      category: "achievement" as const,
      level: "bronze" as const,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Communicateur expert",
      description: "Excellentes compétences en communication démontrées lors du stage",
      icon: "💬",
      criteria: "Avoir reçu une évaluation positive sur les compétences de communication",
      issuer: {
        name: "MesStages",
        url: "https://messtages.fr",
        email: "badges@messtages.fr"
      },
      category: "soft-skills" as const,
      level: "silver" as const,
      createdAt: "2024-01-15"
    },
    {
      id: "3",
      name: "Expert secteur Santé",
      description: "Connaissance approfondie du secteur de la santé",
      icon: "🏥",
      criteria: "Avoir effectué 3 stages ou plus dans le secteur de la santé",
      issuer: {
        name: "MesStages",
        url: "https://messtages.fr",
        email: "badges@messtages.fr"
      },
      category: "sector-specific" as const,
      level: "gold" as const,
      createdAt: "2024-01-15"
    },
    {
      id: "4",
      name: "Maîtrise des outils numériques",
      description: "Compétences techniques en outils informatiques",
      icon: "💻",
      criteria: "Avoir utilisé et maîtrisé des outils numériques spécialisés",
      issuer: {
        name: "MesStages",
        url: "https://messtages.fr",
        email: "badges@messtages.fr"
      },
      category: "technical" as const,
      level: "silver" as const,
      createdAt: "2024-01-15"
    }
  ]

  const userBadges = [
    {
      id: "ub1",
      badgeId: "1",
      userId: "user1",
      experienceId: "exp1",
      issuedAt: "2024-02-01",
      evidence: {
        type: "experience" as const,
        description: "Stage d'observation chez TechCorp pendant 1 semaine"
      },
      verified: true
    },
    {
      id: "ub2",
      badgeId: "2",
      userId: "user1",
      experienceId: "exp1",
      issuedAt: "2024-02-05",
      evidence: {
        type: "assessment" as const,
        description: "Évaluation positive du tuteur de stage"
      },
      verified: true
    }
  ]

  const earnedBadgeIds = userBadges.map(ub => ub.badgeId)
  const earnedBadges = availableBadges.filter(badge => earnedBadgeIds.includes(badge.id))
  const availableEarnBadges = availableBadges.filter(badge => !earnedBadgeIds.includes(badge.id))

  const categoryBreakdown = [
    { category: "soft-skills", earned: 1, total: 1 },
    { category: "technical", earned: 0, total: 1 },
    { category: "sector-specific", earned: 0, total: 1 },
    { category: "achievement", earned: 1, total: 1 }
  ]

  const filteredBadges = (badges: typeof availableBadges) => {
    return badges.filter(badge => {
      const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           badge.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || badge.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }

  const handleExportBadge = (badgeId: string) => {
    const badge = availableBadges.find(b => b.id === badgeId)
    const userBadge = userBadges.find(ub => ub.badgeId === badgeId)
    
    if (badge && userBadge) {
      // Simulation de l'export OpenBadges
      const assertion = {
        "@context": "https://w3id.org/openbadges/v2",
        "type": "Assertion",
        "id": `https://messtages.fr/badges/assertions/${userBadge.id}`,
        "recipient": {
          "type": "email",
          "hashed": true,
          "identity": "sha256$encrypted_email_hash"
        },
        "badge": `https://messtages.fr/badges/${badge.id}`,
        "issuedOn": userBadge.issuedAt,
        "evidence": {
          "id": `https://messtages.fr/experiences/${userBadge.experienceId}`,
          "narrative": userBadge.evidence.description
        },
        "verification": {
          "type": "hosted",
          "startsWith": "https://messtages.fr/badges/assertions/"
        }
      }

      // Créer et télécharger le fichier JSON
      const blob = new Blob([JSON.stringify(assertion, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `badge-${badge.name.replace(/\s+/g, '-').toLowerCase()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Badge exporté",
        description: "Votre badge OpenBadges a été téléchargé avec succès"
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mes Badges</h1>
          <p className="text-gray-600">
            Certifiez vos compétences acquises lors de vos stages
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Exporter tous mes badges
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Tableau de bord
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BadgeProgress
            totalBadges={availableBadges.length}
            earnedBadges={earnedBadges.length}
            categoryBreakdown={categoryBreakdown}
          />
        </CardContent>
      </Card>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un badge..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            Tous
          </Button>
          <Button
            variant={selectedCategory === "soft-skills" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("soft-skills")}
          >
            Soft Skills
          </Button>
          <Button
            variant={selectedCategory === "technical" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("technical")}
          >
            Technique
          </Button>
          <Button
            variant={selectedCategory === "sector-specific" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("sector-specific")}
          >
            Secteur
          </Button>
          <Button
            variant={selectedCategory === "achievement" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("achievement")}
          >
            Réussites
          </Button>
        </div>
      </div>

      <Tabs defaultValue="earned" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="earned">Badges obtenus ({earnedBadges.length})</TabsTrigger>
          <TabsTrigger value="available">Badges disponibles ({availableEarnBadges.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="earned" className="space-y-4">
          {earnedBadges.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Award className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun badge obtenu</h3>
                <p className="text-gray-500 text-center">
                  Commencez par partager vos expériences de stage pour obtenir vos premiers badges !
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBadges(earnedBadges).map((badge) => {
                const userBadge = userBadges.find(ub => ub.badgeId === badge.id)
                return (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    userBadge={userBadge}
                    isEarned={true}
                    onExport={() => handleExportBadge(badge.id)}
                  />
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges(availableEarnBadges).map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isEarned={false}
                onClaim={() => {
                  toast({
                    title: "Badge non disponible",
                    description: "Vous devez remplir les critères pour obtenir ce badge"
                  })
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
