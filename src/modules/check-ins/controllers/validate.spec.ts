import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthUser } from '@/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Validate Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to validate a check-in', async () => {
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

    const checkIn = await prisma.checkIn.create({
      data: {
        gymId: gym.id,
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send()

    expect(response.statusCode).toEqual(204)

    const checkInValidated = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkInValidated.validatedAt).toEqual(expect.any(Date))
  })
})
