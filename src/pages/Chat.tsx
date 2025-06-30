
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Search, MoreVertical } from "lucide-react"

interface Message {
  id: string
  content: string
  timestamp: Date
  sender: 'me' | 'other'
  senderName?: string
}

interface Conversation {
  id: string
  participant: {
    name: string
    avatar?: string
    lastSeen: string
  }
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  experienceTitle: string
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    participant: {
      name: "Marie Dubois",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      lastSeen: "En ligne"
    },
    lastMessage: "Merci pour tes questions ! N'hésite pas si tu en as d'autres.",
    lastMessageTime: "14:30",
    unreadCount: 0,
    experienceTitle: "Stage en Développement Web chez TechCorp"
  },
  {
    id: "2",
    participant: {
      name: "Thomas Martin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastSeen: "Il y a 2h"
    },
    lastMessage: "La formation était vraiment complète sur Google Ads et Facebook Ads.",
    lastMessageTime: "12:15",
    unreadCount: 2,
    experienceTitle: "Stage Marketing Digital chez AdAgency"
  },
  {
    id: "3",
    participant: {
      name: "Sophie Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastSeen: "Il y a 1 jour"
    },
    lastMessage: "Les normes de sécurité sont très strictes dans l'aéronautique.",
    lastMessageTime: "Hier",
    unreadCount: 0,
    experienceTitle: "Stage Ingénieur Logiciel chez InnovateTech"
  }
]

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Salut ! J'ai vu ton expérience chez TechCorp, ça m'intéresse beaucoup. Comment s'est passé ton stage ?",
    timestamp: new Date("2024-01-15T10:00:00"),
    sender: 'me'
  },
  {
    id: "2",
    content: "Salut ! Ça s'est super bien passé. L'équipe était vraiment accueillante et j'ai beaucoup appris.",
    timestamp: new Date("2024-01-15T10:05:00"),
    sender: 'other',
    senderName: 'Marie Dubois'
  },
  {
    id: "3",
    content: "Est-ce que tu peux me parler des technologies que tu as utilisées ?",
    timestamp: new Date("2024-01-15T10:10:00"),
    sender: 'me'
  },
  {
    id: "4",
    content: "Bien sûr ! J'ai principalement travaillé avec React et Node.js. On utilisait aussi MongoDB pour la base de données et Docker pour les conteneurs.",
    timestamp: new Date("2024-01-15T10:15:00"),
    sender: 'other',
    senderName: 'Marie Dubois'
  },
  {
    id: "5",
    content: "Et comment était l'ambiance de travail ? Est-ce qu'il y avait beaucoup de pression ?",
    timestamp: new Date("2024-01-15T10:20:00"),
    sender: 'me'
  },
  {
    id: "6",
    content: "L'ambiance était excellente ! Pas de pression excessive, mais on avait des deadlines à respecter. L'équipe était toujours là pour aider quand j'avais des questions.",
    timestamp: new Date("2024-01-15T10:25:00"),
    sender: 'other',
    senderName: 'Marie Dubois'
  }
]

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = mockConversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.experienceTitle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Ici, on ajouterait la logique pour envoyer le message
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-4">
      {/* Conversations List */}
      <Card className="w-1/3 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Conversations</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher une conversation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.participant.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm truncate">
                        {conversation.participant.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessageTime}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1 truncate">
                      {conversation.experienceTitle}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        conversation.participant.lastSeen === "En ligne" ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className="text-xs text-gray-500">
                        {conversation.participant.lastSeen}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={mockConversations.find(c => c.id === selectedConversation)?.participant.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {mockConversations.find(c => c.id === selectedConversation)?.participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {mockConversations.find(c => c.id === selectedConversation)?.participant.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {mockConversations.find(c => c.id === selectedConversation)?.participant.lastSeen}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-lg ${
                          message.sender === 'me'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium mb-2">Sélectionnez une conversation</p>
              <p className="text-sm">Choisissez une conversation pour commencer à discuter</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
