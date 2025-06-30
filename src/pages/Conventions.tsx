
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Plus, Users, School, Building, User, Clock, CheckCircle, AlertCircle, PenTool } from "lucide-react"

const conventionsList = [
  {
    id: "1",
    student: "Emma Dupont",
    class: "3ème B",
    company: "Pharmacie Martin",
    period: "15-19 Jan 2024",
    status: "En attente signature école",
    signatures: {
      student: true,
      parent: true,
      company: true,
      school: false
    }
  },
  {
    id: "2",
    student: "Lucas Moreau",
    class: "2nde Pro",
    company: "Clinique Vétérinaire des Pins",
    period: "22-26 Jan 2024",
    status: "Complète",
    signatures: {
      student: true,
      parent: true,
      company: true,
      school: true
    }
  },
  {
    id: "3",
    student: "Léa Bernard",
    class: "3ème A",
    company: "École primaire Jean Moulin",
    period: "29 Jan - 2 Fév 2024",
    status: "En attente signature entreprise",
    signatures: {
      student: true,
      parent: true,
      company: false,
      school: true
    }
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Complète": return "bg-green-100 text-green-800"
    case "En attente signature école": return "bg-yellow-100 text-yellow-800"
    case "En attente signature entreprise": return "bg-orange-100 text-orange-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Complète": return <CheckCircle className="w-4 h-4" />
    case "En attente signature école": return <Clock className="w-4 h-4" />
    case "En attente signature entreprise": return <AlertCircle className="w-4 h-4" />
    default: return <Clock className="w-4 h-4" />
  }
}

export default function Conventions() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Conventions de stage
        </h1>
        <p className="text-lg text-gray-600">
          Gestion collaborative des conventions entre École, Entreprise et Stagiaire
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total conventions</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Complètes</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <PenTool className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Signatures électroniques</p>
                <p className="text-2xl font-bold">72</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="create">Nouvelle convention</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Conventions récentes</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle convention
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élève</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Signatures</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conventionsList.map((convention) => (
                    <TableRow key={convention.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{convention.student}</p>
                          <p className="text-sm text-muted-foreground">{convention.class}</p>
                        </div>
                      </TableCell>
                      <TableCell>{convention.company}</TableCell>
                      <TableCell>{convention.period}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(convention.status)}>
                          {getStatusIcon(convention.status)}
                          <span className="ml-1">{convention.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <div className={`w-2 h-2 rounded-full ${convention.signatures.student ? 'bg-green-500' : 'bg-gray-300'}`} title="Élève" />
                          <div className={`w-2 h-2 rounded-full ${convention.signatures.parent ? 'bg-green-500' : 'bg-gray-300'}`} title="Parent" />
                          <div className={`w-2 h-2 rounded-full ${convention.signatures.company ? 'bg-green-500' : 'bg-gray-300'}`} title="Entreprise" />
                          <div className={`w-2 h-2 rounded-full ${convention.signatures.school ? 'bg-green-500' : 'bg-gray-300'}`} title="École" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle convention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Section Élève */}
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold">Informations Élève</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p>• Nom, prénom, classe</p>
                    <p>• Dates de naissance</p>
                    <p>• Coordonnées personnelles</p>
                    <p>• Signature électronique</p>
                  </div>
                </Card>

                {/* Section Parents */}
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold">Espace Parental</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p>• Autorisation parentale</p>
                    <p>• Coordonnées responsables</p>
                    <p>• Assurance scolaire</p>
                    <p>• Signature électronique</p>
                  </div>
                </Card>

                {/* Section École */}
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <School className="w-5 h-5 text-purple-500" />
                    <h4 className="font-semibold">Validation École</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p>• Objectifs pédagogiques</p>
                    <p>• Professeur référent</p>
                    <p>• Modalités d'évaluation</p>
                    <p>• Signature direction</p>
                  </div>
                </Card>
              </div>

              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="w-5 h-5 text-orange-500" />
                  <h4 className="font-semibold">Informations Entreprise</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p>• Raison sociale et SIRET</p>
                    <p>• Adresse du lieu de stage</p>
                    <p>• Secteur d'activité</p>
                  </div>
                  <div className="space-y-2">
                    <p>• Tuteur en entreprise</p>
                    <p>• Conditions d'accueil</p>
                    <p>• Signature responsable</p>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center">
                <Button size="lg" className="px-8">
                  <Plus className="w-4 h-4 mr-2" />
                  Démarrer la création
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Modèle Collège (3ème)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Convention type pour stage d'observation en classe de 3ème
                </p>
                <div className="space-y-2 text-sm">
                  <p>• Durée : 1 semaine</p>
                  <p>• Objectif : Découverte professionnelle</p>
                  <p>• Évaluation : Rapport de stage</p>
                </div>
                <Button variant="outline" className="mt-4">
                  Utiliser ce modèle
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modèle Lycée Pro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Convention pour stage en formation professionnelle
                </p>
                <div className="space-y-2 text-sm">
                  <p>• Durée : 2-4 semaines</p>
                  <p>• Objectif : Mise en pratique</p>
                  <p>• Évaluation : Grille de compétences</p>
                </div>
                <Button variant="outline" className="mt-4">
                  Utiliser ce modèle
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
