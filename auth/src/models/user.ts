import { app } from '../app';

export interface Id {
  id: number;
}

export interface UserAttr {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  password: string;
}

export class UserModel {
  private DEFAULT_LIMIT = 20;
  private DEFAULT_OFFSET = 0;

  async findByEmail(email: string): Promise<UserData> {
    const { rows } = await app.pg.query<UserData>(`
      SELECT * 
      FROM users 
      WHERE email = '${email}'
    `);

    app.log.info(`user-findByEmail: ${rows[0]?.email || 'not-found'}`);
    return rows[0];
  }

  async create({
    email,
    password,
  }: UserAttr): Promise<{ isCreated: boolean; id: number }> {
    const { rows, rowCount } = await app.pg.query<Id>(`
      INSERT INTO users (email, password) 
      VALUES ('${email}', '${password}')
      RETURNING id
    `);

    app.log.info(
      `user-create: ${rowCount ? 'created' : 'not-created'}, ${email}`
    );

    const isCreated = rowCount === 1 ? true : false;

    return { isCreated, id: rows[0]?.id };
  }

  async findAll(
    limit: number = this.DEFAULT_LIMIT,
    offset: number = this.DEFAULT_OFFSET
  ): Promise<UserData[]> {
    const { rows } = await app.pg.query<UserData>(`
      SELECT * 
      FROM users 
      LIMIT ${limit}
      OFFSET ${offset}
    `);

    return rows;
  }

  async deleteByEmail(email: string): Promise<{ isDeleted: boolean }> {
    const { rowCount } = await app.pg.query(`
      DELETE FROM users  
      WHERE email = '${email}'
    `);

    app.log.info(
      `user-delete: ${rowCount ? 'deleted' : 'not-deleted'}, ${email}`
    );

    const isDeleted = rowCount === 1 ? true : false;

    return { isDeleted };
  }
}

export const userModel = new UserModel();
