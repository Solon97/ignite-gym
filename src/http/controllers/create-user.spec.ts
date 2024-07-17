/* eslint-disable prettier/prettier */
import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
describe('Create User (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to create a new user', async () => {
        const response = await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'john@test.com',
            password: '123456',
        })

        expect(response.statusCode).toEqual(201)
    })
})
