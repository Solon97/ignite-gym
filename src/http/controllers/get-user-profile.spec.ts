/* eslint-disable prettier/prettier */
import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to get profile', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const authResponse = await request(app.server).post('/auth').send({
            email: 'john@test.com',
            password: '123456',
        })

        const { token } = authResponse.body

        const profileResponse = await request(app.server).get('/me').set({
            Authorization: `Bearer ${token}`,
        })

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: 'john@test.com',
            }),
        )
    })
})
