import bcrypt from 'bcrypt';
import { BadRequestError } from '../errors';
import { UserAttr, userModel, Id } from '../models';

export class SignService {
  async signup({ email, password }: UserAttr): Promise<Id> {
    const foundUser = await userModel.findByEmail(email);

    if (foundUser) {
      throw new BadRequestError('This email is already being used');
    }

    const passwordHash = await bcrypt.hash(password, 10);

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
    const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

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
    const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

    if (!isPasswordCorrect) {
      throw new BadRequestError('Password does not match');
    }

    await userModel.deleteByEmail(email);
  }
}

export const signService = new SignService();
