import { CheckIn } from '@check-ins/repositories/interface'
import { Gym } from '@gyms/repositories/interface'
import { User } from '@users/repositories/interface'

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
  latitude: latitude ?? 0,
  longitude: longitude ?? 0,
  createdAt: new Date('2024-06-01'),
})

export const getFakeCheckIn = ({
  id,
  userId,
  gymId,
}: {
  id?: string
  userId?: string
  gymId?: string
}): CheckIn => ({
  id: id ?? 'test-check-in',
  validatedAt: null,
  user: getFakeUser(userId),
  gym: getFakeGym({ id: gymId }),
  createdAt: new Date(),
})

export const getFakeCheckIns = ({
  gym,
  length,
  user,
}: {
  length: number
  user: User
  gym: Gym
}): CheckIn[] =>
  Array.from({ length }, (_, i) => ({
    id: `checkin-${i}`,
    validatedAt: null,
    user,
    gym,
    createdAt: new Date('2024-06-01'),
  }))
