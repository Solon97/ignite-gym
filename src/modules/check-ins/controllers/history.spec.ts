import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthUser } from '@/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-in History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list check-ins history', async () => {
    const { token } = await createAndAuthUser(app)

    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        name: 'JavaScript Gym',
        description: 'Some description.',
        phone: '11999999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gymId: gym.id,
          userId: user.id,
        },
        {
          gymId: gym.id,
          userId: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.check_ins).toHaveLength(2)
    expect(response.body.check_ins).toEqual([
      expect.objectContaining({
        gymId: gym.id,
        userId: user.id,
      }),
      expect.objectContaining({
        gymId: gym.id,
        userId: user.id,
      }),
    ])
  })
})
