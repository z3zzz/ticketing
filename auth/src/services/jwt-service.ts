import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants';
import { UnAuthorizedError } from '../errors';

export class JwtService {
  private key = JWT_SECRET_KEY!;

  createToken(payload: Record<string, any>): string {
    const token = jwt.sign(payload, this.key);

    return token;
  }

  getPayload<T extends JwtPayload>(token: string): T {
    try {
      const payload = jwt.verify(token, this.key) as T;

      return payload;
    } catch {
      throw new UnAuthorizedError('Invalid credential token');
    }
  }
}

export const jwtService = new JwtService();
