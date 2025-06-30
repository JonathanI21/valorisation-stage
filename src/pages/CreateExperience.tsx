import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, X, Plus, Camera, Video, FileText, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CreateExperience() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
    description: "",
    tags: [] as string[],
    plan: [
      { id: 1, title: "Présentation du lieu de stage", content: "", completed: false },
      { id: 2, title: "Les missions que j'ai observées", content: "", completed: false },
      { id: 3, title: "Ce que j'ai appris", content: "", completed: false },
      { id: 4, title: "L'ambiance et l'équipe", content: "", completed: false },
      { id: 5, title: "Mes conseils pour un futur stage", content: "", completed: false }
    ]
  })
  const [newTag, setNewTag] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { toast } = useToast()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handlePlanItemChange = (id: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      plan: prev.plan.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles(prev => [...prev, ...newFiles])
      toast({
        title: "Fichiers ajoutés",
        description: `${newFiles.length} fichier(s) ajouté(s) avec succès`
      })
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informations sur ton stage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre de ton expérience</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Stage d'observation chez..."
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Lieu de stage</Label>
                  <Input
                    id="company"
                    placeholder="Nom de l'entreprise, cabinet, école..."
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Ville</Label>
                  <Input
                    id="location"
                    placeholder="Ville"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Durée du stage</Label>
                  <Input
                    id="duration"
                    placeholder="Ex: 1 semaine"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Résumé de ton expérience</Label>
                <Textarea
                  id="description"
                  placeholder="Raconte en quelques mots ton stage..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <div>
                <Label>Mots-clés (classe, domaine, métier...)</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Ajouter un mot-clé"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Raconte ton stage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Structure ton récit en remplissant chaque section. Cela aidera d'autres élèves à mieux comprendre ton expérience.
              </p>
              
              {formData.plan.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      {item.title}
                    </h4>
                  </div>
                  <Textarea
                    placeholder={`Décris ${item.title.toLowerCase()}...`}
                    value={item.content}
                    onChange={(e) => handlePlanItemChange(item.id, 'content', e.target.value)}
                    rows={3}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Photos et documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Ajoute des photos ou documents pour illustrer ton stage (avec autorisation !).
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-lg font-medium">Clique pour ajouter des fichiers</div>
                  <div className="text-sm text-gray-500">
                    Photos, vidéos, PDF - Max 10MB par fichier
                  </div>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Fichiers ajoutés ({uploadedFiles.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          {file.type.startsWith('image/') && <Camera className="w-4 h-4" />}
                          {file.type.startsWith('video/') && <Video className="w-4 h-4" />}
                          {file.type.includes('pdf') && <FileText className="w-4 h-4" />}
                          <span className="text-sm truncate">{file.name}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Aperçu et publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{formData.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {formData.company} • {formData.location} • {formData.duration}
                </p>
                <p className="text-sm mb-3">{formData.description}</p>
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Plan de ton récit</h4>
                <div className="space-y-2">
                  {formData.plan.map((item, index) => (
                    <div key={item.id} className="text-sm">
                      <span className="font-medium">{index + 1}. {item.title}</span>
                      {item.content && (
                        <p className="text-gray-600 ml-4 mt-1">
                          {item.content.substring(0, 100)}...
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Fichiers joints ({uploadedFiles.length})</h4>
                  <div className="text-sm text-gray-600">
                    {uploadedFiles.map(f => f.name).join(', ')}
                  </div>
                </div>
              )}

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => {
                  toast({
                    title: "Ton expérience est publiée !",
                    description: "Ton stage est maintenant visible par tous les autres élèves."
                  })
                }}
              >
                Publier mon expérience de stage
              </Button>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Partage ton expérience de stage</h1>
        <p className="text-gray-600">
          Aide d'autres collégiens et lycéens en racontant ton stage
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Étape {currentStep} sur {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% complété</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {renderStep()}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Précédent
        </Button>
        <Button
          onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
          disabled={currentStep === totalSteps}
        >
          {currentStep === totalSteps ? 'Publier' : 'Suivant'}
        </Button>
      </div>
    </div>
  )
}
