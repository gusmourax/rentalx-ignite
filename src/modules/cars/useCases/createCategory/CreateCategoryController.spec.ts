import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();
        const name = 'admin';
        const password = await hash('admin', 10);
        const email = 'gustavomoura5555@outlook.com';

        await connection.query(`
        INSERT INTO users (id, name, email, password, is_admin, driver_license, created_at)
            VALUES ('${id}', '${name}', '${email}', '${password}', true, 'XXXXXX', NOW());
        `);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should be able to create a new category', async () => {
        const responseToken = await request(app).post('/sessions')
            .send({
                email: 'gustavomoura5555@outlook.com',
                password: 'admin',
            });

        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'SuperTest',
                description: 'Category SuperTest',
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);
    });

    it('Should not be able to create a new category with name exists', async () => {
        const responseToken = await request(app).post('/sessions')
            .send({
                email: 'gustavomoura5555@outlook.com',
                password: 'admin',
            });

        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'SuperTest',
                description: 'Category SuperTest',
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
    });
});
