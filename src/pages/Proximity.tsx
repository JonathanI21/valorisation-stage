
import { useState, useEffect } from "react"
import { useGeolocation } from "@/hooks/useGeolocation"
import { ProximityProfile } from "@/components/ProximityProfile"
import { isWithinRange } from "@/utils/distance"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Wifi, WifiOff, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Données simulées d'utilisateurs pour la démonstration
const mockUsers = [
  {
    id: "1",
    name: "Emma Dupont",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
    level: "3ème",
    school: "Collège Victor Hugo",
    latitude: 43.6047,
    longitude: 1.4442,
    interests: ["Santé", "Pharmacie", "Sciences"]
  },
  {
    id: "2",
    name: "Lucas Moreau",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    level: "3ème",
    school: "Collège Jean Moulin",
    latitude: 43.6037,
    longitude: 1.4432,
    interests: ["Vétérinaire", "Animaux", "Biologie"]
  },
  {
    id: "3",
    name: "Léa Bernard",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    level: "2nde",
    school: "Lycée Pierre de Fermat",
    latitude: 43.6057,
    longitude: 1.4452,
    interests: ["Éducation", "Enseignement", "Littérature"]
  }
]

export default function Proximity() {
  const location = useGeolocation()
  const { toast } = useToast()
  const [nearbyUsers, setNearbyUsers] = useState<typeof mockUsers>([])
  const [isScanning, setIsScanning] = useState(false)

  const scanForNearbyUsers = () => {
    if (!location.latitude || !location.longitude) return

    setIsScanning(true)
    
    // Simuler un délai de scan
    setTimeout(() => {
      const nearby = mockUsers.filter(user => 
        isWithinRange(
          location.latitude!,
          location.longitude!,
          user.latitude,
          user.longitude,
          30
        )
      ).map(user => ({
        ...user,
        distance: Math.round(Math.random() * 30) // Distance simulée entre 0 et 30m
      }))

      setNearbyUsers(nearby)
      setIsScanning(false)

      if (nearby.length > 0) {
        toast({
          title: "Profils détectés !",
          description: `${nearby.length} étudiant(s) trouvé(s) à proximité`,
        })
      }
    }, 2000)
  }

  useEffect(() => {
    if (location.latitude && location.longitude && !location.loading) {
      scanForNearbyUsers()
    }
  }, [location.latitude, location.longitude, location.loading])

  const handleMessage = (userId: string) => {
    toast({
      title: "Message envoyé",
      description: "Votre demande de contact a été envoyée !",
    })
  }

  if (location.loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-600">Localisation en cours...</p>
        </div>
      </div>
    )
  }

  if (location.error) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reconnaissance de proximité
          </h1>
          <p className="text-lg text-gray-600">
            Trouvez d'autres étudiants près de chez vous
          </p>
        </div>

        <Alert>
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            {location.error}. Veuillez autoriser l'accès à votre localisation pour utiliser cette fonctionnalité.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reconnaissance de proximité
        </h1>
        <p className="text-lg text-gray-600">
          Découvrez d'autres étudiants dans un rayon de 30 mètres
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-green-600" />
              Votre position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-xs">
              <Wifi className="w-3 h-3 mr-1" />
              Localisé
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              Étudiants détectés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="text-xs">
              {nearbyUsers.length} profil(s)
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={scanForNearbyUsers}
              disabled={isScanning}
              size="sm"
              className="w-full"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Scan en cours...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {nearbyUsers.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary" />
            Étudiants à proximité
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyUsers.map((user) => (
              <ProximityProfile
                key={user.id}
                user={user}
                onMessage={handleMessage}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun étudiant à proximité
            </h3>
            <p className="text-gray-500 mb-4">
              Il n'y a personne dans un rayon de 30 mètres pour le moment
            </p>
            <Button onClick={scanForNearbyUsers} disabled={isScanning}>
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Recherche...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Rechercher à nouveau
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
