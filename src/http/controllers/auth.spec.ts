/* eslint-disable prettier/prettier */
import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
describe('Auth (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to authenticate', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        const response = await request(app.server).post('/auth').send({
            email: 'john@test.com',
            password: '123456',
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String),
        })
    })
})
