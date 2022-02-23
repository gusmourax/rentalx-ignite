import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import createConnection from '../index';

const create = async () => {
    const connection = await createConnection();

    const id = uuidv4();
    const name = 'admin';
    const password = await hash('admin', 10);
    const email = 'gustavomoura5555@outlook.com';

    await connection.query(`
        INSERT INTO users (id, name, email, password, is_admin, driver_license, created_at)
            VALUES ('${id}', '${name}', '${email}', '${password}', true, 'XXXXXX', NOW());
    `);

    await connection.close();
};

create().then(() => console.log('Admin created!'));
