import { CheckIn, Gym, Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

export const getFakeUser = (id?: string): User => ({
  id: id ?? 'test-user',
  name: '',
  email: '',
  passwordHash: '',
  createdAt: new Date('2024-06-01'),
})

export const getFakeGym = ({
  id,
  latitude,
  longitude,
}: {
  id?: string
  latitude?: number
  longitude?: number
}): Gym => ({
  id: id ?? 'test-gym',
  name: '',
  description: null,
  phone: null,
  latitude: latitude ? new Prisma.Decimal(latitude) : new Prisma.Decimal(0),
  longitude: longitude ? new Prisma.Decimal(longitude) : new Prisma.Decimal(0),
  createdAt: new Date('2024-06-01'),
})

export const getFakeCheckIn = ({
  id,
  userId,
  gymId,
  date,
}: {
  id?: string
  userId?: string
  gymId?: string
  date?: Date
}): CheckIn => ({
  id: id ?? 'test-check-in',
  validatedAt: null,
  user_id: userId ?? 'test-user',
  gym_id: gymId ?? 'test-gym',
  createdAt: date ?? new Date(),
})

export const getFakeCheckIns = ({
  gymId,
  length,
  userId,
}: {
  length: number
  userId: string
  gymId: string
}): CheckIn[] =>
  Array.from({ length }, (_, i) => ({
    id: `checkin-${++i}`,
    validatedAt: null,
    user_id: userId ?? randomUUID(),
    gym_id: gymId ?? randomUUID(),
    createdAt: new Date('2024-06-01'),
  }))

export const getFakeGyms = (length: number): Gym[] =>
  Array.from({ length }, (_, i) => ({
    id: `gym-${++i}`,
    name: `Gym ${i}`,
    description: null,
    latitude: new Prisma.Decimal(0),
    longitude: new Prisma.Decimal(0),
    phone: null,
    createdAt: new Date('2024-06-01'),
  }))
