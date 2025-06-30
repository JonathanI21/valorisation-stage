
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Briefcase } from "lucide-react"

const jobSectors = [
  {
    name: "Santé et Social",
    code: "330",
    jobs: ["Pharmacien", "Infirmier", "Aide-soignant", "Vétérinaire", "Kinésithérapeute"],
    count: 45
  },
  {
    name: "Éducation et Formation",
    code: "333",
    jobs: ["Professeur des écoles", "Éducateur", "Formateur", "Conseiller d'orientation"],
    count: 28
  },
  {
    name: "Commerce et Vente",
    code: "312",
    jobs: ["Vendeur", "Commercial", "Caissier", "Chef de rayon", "Manager retail"],
    count: 67
  },
  {
    name: "Artisanat et Métiers d'Art",
    code: "213",
    jobs: ["Boulanger", "Coiffeur", "Menuisier", "Électricien", "Plombier"],
    count: 34
  },
  {
    name: "Administration et Bureautique",
    code: "324",
    jobs: ["Secrétaire", "Assistant administratif", "Comptable", "Réceptionniste"],
    count: 23
  },
  {
    name: "Industrie et Technique",
    code: "250",
    jobs: ["Technicien", "Mécanicien", "Soudeur", "Opérateur machine", "Contrôleur qualité"],
    count: 19
  }
]

interface JobSectorFilterProps {
  selectedSector: string | null
  onSectorChange: (sector: string | null) => void
}

export function JobSectorFilter({ selectedSector, onSectorChange }: JobSectorFilterProps) {
  const [expandedSectors, setExpandedSectors] = useState<string[]>([])

  const toggleSector = (sectorName: string) => {
    setExpandedSectors(prev => 
      prev.includes(sectorName) 
        ? prev.filter(s => s !== sectorName)
        : [...prev, sectorName]
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Métiers par secteur (RNCP)</h3>
      </div>

      <div className="space-y-2">
        <Button
          variant={selectedSector === null ? "default" : "outline"}
          size="sm"
          onClick={() => onSectorChange(null)}
          className="mb-2"
        >
          Tous les secteurs
        </Button>

        {jobSectors.map((sector) => (
          <div key={sector.name} className="border rounded-lg p-3">
            <Collapsible
              open={expandedSectors.includes(sector.name)}
              onOpenChange={() => toggleSector(sector.name)}
            >
              <div className="flex items-center justify-between">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    {expandedSectors.includes(sector.name) ? (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-2" />
                    )}
                    {sector.name}
                  </Button>
                </CollapsibleTrigger>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {sector.count} stages
                  </Badge>
                  <Button
                    variant={selectedSector === sector.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSectorChange(selectedSector === sector.name ? null : sector.name)}
                  >
                    Filtrer
                  </Button>
                </div>
              </div>

              <CollapsibleContent className="mt-3">
                <div className="text-xs text-muted-foreground mb-2">
                  Code RNCP: {sector.code}
                </div>
                <div className="flex flex-wrap gap-1">
                  {sector.jobs.map((job) => (
                    <Badge key={job} variant="outline" className="text-xs">
                      {job}
                    </Badge>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  )
}
