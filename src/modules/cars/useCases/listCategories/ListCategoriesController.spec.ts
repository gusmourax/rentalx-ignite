import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('List Categories Controller', () => {
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

    it('should be able to list all categories', async () => {
        const responseToken = await request(app).post('/sessions')
            .send({
                email: 'gustavomoura5555@outlook.com',
                password: 'admin',
            });

        const { token } = responseToken.body;

        await request(app)
            .post('/categories')
            .send({
                name: 'SuperTest',
                description: 'Category SuperTest',
            })
            .set('Authorization', `Bearer ${token}`);

        const response = await request(app)
            .get('/categories');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toEqual('SuperTest');
    });
});
