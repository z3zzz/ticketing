import bcrypt from 'bcrypt';
import { BadRequestError } from '../errors';
import { UserAttr, userModel } from '../models';

export class UserService {
  async signup({ email, password }: UserAttr): Promise<void> {
    const foundUser = await userModel.findByEmail(email);

    if (foundUser) {
      throw new BadRequestError('This email is already being used');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await userModel.create({ email, password: passwordHash });
  }

  async signin({ email, password }: UserAttr): Promise<void> {
    const foundUser = await userModel.findByEmail(email);

    if (!foundUser) {
      throw new BadRequestError(
        'Signin failed. Please check email and password'
      );
    }

    const { password: passwordHash } = foundUser;
    const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

    if (!isPasswordCorrect) {
      throw new BadRequestError(
        'Signin failed. Please check email and password'
      );
    }
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

export const userService = new UserService();
