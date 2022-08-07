import {
  setEmail,
  setPassword,
  useAppSelector,
  useAppDispatch,
} from '../states';
import type { ErrorResponse } from '../utils';
import InputItem from './input-item';
import Link from './link';
import styles from './email-password-form.module.scss';

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
    <div className={styles.container}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h1 className={styles.h1}>TicketCreature</h1>
          <h2 className={styles.h2}>Buy and sell the world&apos;s</h2>
          <h2 className={styles.h2}>tickets, whenever you want.</h2>
        </div>
        <div className={styles.form}>
          <form onSubmit={onSubmit}>
            <InputItem
              label=""
              type="email"
              placeholder="Email"
              initialValue={email}
              setGlobalValue={setEmailValue}
            />
            <InputItem
              label=""
              type="password"
              placeholder="Password"
              initialValue={password}
              setGlobalValue={setPasswordValue}
            />
            {error && <span className={styles.error}>{error.message}</span>}
            <button className={styles.button}>{buttonText}</button>
          </form>
          {isSignin && (
            <div className={styles.extra}>
              <div className={styles.forgot}>
                <Link
                  href="#find-password"
                  title="Forgot password?"
                  className={styles.forgotLink}
                />
              </div>
              <div className={styles.line}></div>
              <div className={styles.create}>
                <Link
                  href="/signup"
                  title="Create new account"
                  className={styles.createLink}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailPasswordForm;
