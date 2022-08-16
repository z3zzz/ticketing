import { app } from '../app';

export interface Id {
  id: number;
}

export interface TicketAttr {
  title: string;
  price: string;
  userId: string;
}

export interface TicketData {
  id: number;
  user_id: number;
  title: string;
  price: string;
}

export class TicketModel {
  private DEFAULT_LIMIT = 20;
  private DEFAULT_OFFSET = 0;

  async findById(id: string): Promise<TicketData> {
    const { rows } = await app.pg.query<TicketData>(`
      SELECT * 
      FROM tickets 
      WHERE id = '${id}'
    `);

    app.log.info(`ticket-findById: ${rows[0]?.id || 'not-found'}`);
    return rows[0];
  }

  async findByUserId(userId: string): Promise<TicketData> {
    const { rows } = await app.pg.query<TicketData>(`
      SELECT * 
      FROM tickets 
      WHERE user_id = '${userId}'
    `);

    app.log.info(`ticket-findByUserId: ${rows[0]?.id || 'not-found'}`);
    return rows[0];
  }

  async create({
    title,
    price,
    userId,
  }: TicketAttr): Promise<{ isCreated: boolean; id: number }> {
    const { rows, rowCount } = await app.pg.query<Id>(`
      INSERT INTO tickets (title, price, user_id) 
      VALUES ('${title}', '${price}', '${userId}')
      RETURNING id
    `);

    app.log.info(
      `ticket-create: ${rowCount ? 'created' : 'not-created'}, ${title}`
    );

    const isCreated = rowCount === 1 ? true : false;

    return { isCreated, id: rows[0]?.id };
  }

  async findAll(
    limit: number = this.DEFAULT_LIMIT,
    offset: number = this.DEFAULT_OFFSET
  ): Promise<TicketData[]> {
    const { rows } = await app.pg.query<TicketData>(`
      SELECT * 
      FROM tickets 
      LIMIT ${limit}
      OFFSET ${offset}
    `);

    return rows;
  }

  async deleteById(id: string): Promise<{ isDeleted: boolean }> {
    const { rowCount } = await app.pg.query(`
      DELETE FROM tickets  
      WHERE id = '${id}'
    `);

    app.log.info(
      `ticket-delete: ${rowCount ? 'deleted' : 'not-deleted'}, ${id}`
    );

    const isDeleted = rowCount === 1 ? true : false;

    return { isDeleted };
  }
}

export const ticketModel = new TicketModel();
