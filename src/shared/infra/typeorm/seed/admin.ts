import { hash } from 'bcryptjs';
import createConnection from '../index';

import { v4 as uuid } from 'uuid';

async function create(): Promise<void> {
  const connection = await createConnection('localhost');
  const id = uuid();
  const senha = await hash('admin', 8);
  await connection.query(`
    INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license) 
    VALUES ('${id}', 'admin', 'admin@hotmail.com', '${senha}', true,'now()', 'XXXXX')`);
  await connection.close();
}

create().then(() => console.log('user admin created!'));
