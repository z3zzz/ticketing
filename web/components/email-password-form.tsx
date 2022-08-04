import {
  setEmail,
  setPassword,
  useAppSelector,
  useAppDispatch,
} from '../states';
import { ErrorResponse } from '../utils';
import InputItem from './input-item';
import Link from './link';

interface EmailPasswordFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  type: 'signup' | 'signin';
  error: ErrorResponse | null;
}

const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({
  onSubmit,
  type,
  error,
}) => {
  const isSignin = type === 'signin';
  const buttonText = isSignin ? 'Log In' : 'Sign Up';
  const { email, password } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const setEmailValue = (newValue: string) => {
    dispatch(setEmail({ email: newValue }));
  };

  const setPasswordValue = (newValue: string) => {
    dispatch(setPassword({ password: newValue }));
  };

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <InputItem
          label="email"
          type="email"
          placeholder="abc@example.com"
          initialValue={email}
          setGlobalValue={setEmailValue}
        />
        <InputItem
          label="password"
          type="password"
          initialValue={password}
          setGlobalValue={setPasswordValue}
        />
        <button className="button">{buttonText}</button>
      </form>
      {error && <span>{error.message}</span>}
      {isSignin && (
        <div className="extra">
          <div className="forgot">
            <Link
              href="#find-password"
              title="Forgot password?"
              className="forgotLink"
            />
          </div>
          <div className="line"></div>
          <div className="create">
            <Link
              href="/signup"
              title="Create new account"
              className="createLink"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailPasswordForm;
