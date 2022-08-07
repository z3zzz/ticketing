import { useState } from 'react';
import { useRouter } from 'next/router';
import EmailPasswordForm from '../components/email-password-form';
import Head from '../components/head';
import { doLogin, useAppDispatch, useAppSelector } from '../states';
import { sendRequest } from '../utils';
import { GetStaticProps } from 'next';

const Signup: React.FC = () => {
  const { email, password } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, isError } = await sendRequest({
      method: 'POST',
      path: '/api/auth/signup',
      payload: { email, password },
    });

    console.log({ data });

    if (isError) {
      setError(data);
    } else {
      setError(null);
      dispatch(doLogin(data));
      router.replace('/');
    }
  };

  return (
    <div>
      <Head title="signup" />
      <EmailPasswordForm onSubmit={onSubmit} type="signup" error={error} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      isProtected: true,
      criteria: 'beforeLogin',
    },
  };
};

export default Signup;
