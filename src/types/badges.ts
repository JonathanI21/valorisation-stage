
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  criteria: string
  issuer: {
    name: string
    url: string
    email: string
  }
  category: 'soft-skills' | 'technical' | 'sector-specific' | 'achievement'
  level: 'bronze' | 'silver' | 'gold'
  createdAt: string
}

export interface UserBadge {
  id: string
  badgeId: string
  userId: string
  experienceId: string
  issuedAt: string
  evidence: {
    type: 'experience' | 'assessment' | 'peer-review'
    description: string
    url?: string
  }
  verified: boolean
}

export interface OpenBadgeAssertion {
  '@context': string
  type: string
  id: string
  recipient: {
    type: string
    hashed: boolean
    identity: string
  }
  badge: string
  issuedOn: string
  evidence?: {
    id: string
    narrative: string
  }
  verification: {
    type: string
    startsWith: string
  }
}
