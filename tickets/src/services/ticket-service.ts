import crypto from 'crypto';
import { BadRequestError } from '@kwangtickets/common';
import { TicketAttr, TicketModel, Id } from '../models';

export class TicketService {
  async getTicket({ email, password }: UserAttr): Promise<Id> {
    const foundUser = await userModel.findByEmail(email);

    if (foundUser) {
      throw new BadRequestError('This email is already being used');
    }

    const passwordHash = await this.generateHash(password);

    const { id } = await userModel.create({ email, password: passwordHash });

    return { id };
  }

  async signin({ email, password }: UserAttr): Promise<Id> {
    const foundUser = await userModel.findByEmail(email);

    if (!foundUser) {
      throw new BadRequestError(
        'Signin failed. Please check email and password'
      );
    }

    const { id, password: passwordHash } = foundUser;
    const isPasswordCorrect = await this.compare(password, passwordHash);

    if (!isPasswordCorrect) {
      throw new BadRequestError(
        'Signin failed. Please check email and password'
      );
    }

    return { id };
  }

  async signout({ email, password }: UserAttr): Promise<void> {
    const foundUser = await userModel.findByEmail(email);

    if (!foundUser) {
      throw new BadRequestError('This email does not exist');
    }

    const { password: passwordHash } = foundUser;
    const isPasswordCorrect = await this.compare(password, passwordHash);

    if (!isPasswordCorrect) {
      throw new BadRequestError('Password does not match');
    }

    await userModel.deleteByEmail(email);
  }

  private async generateHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');

      crypto.pbkdf2(
        password,
        salt,
        this.iteration,
        this.keylen,
        this.digest,
        (err, derivedKey) => {
          if (err) {
            reject(err);
          }

          resolve(salt + ':' + derivedKey.toString('hex'));
        }
      );
    });
  }

  private async compare(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = passwordHash.split(':');

      crypto.pbkdf2(
        password,
        salt,
        this.iteration,
        this.keylen,
        this.digest,
        (err, derivedKey) => {
          if (err) {
            reject(err);
          }

          resolve(derivedKey.toString('hex') === key);
        }
      );
    });
  }
}

export const ticketService = new TicketService();
