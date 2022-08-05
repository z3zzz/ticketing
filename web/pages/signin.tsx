import { useState } from 'react';
import { useRouter } from 'next/router';
import EmailPasswordForm from '../components/email-password-form';
import Head from '../components/head';
import { doLogin, useAppSelector, useAppDispatch } from '../states';
import { sendRequest } from '../utils';
import { GetStaticProps } from 'next';

const Signin: React.FC = () => {
  const { email, password } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>(null);
  const router = useRouter();
  const previous = router.query.previous as string;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, isError } = await sendRequest({
      method: 'POST',
      path: '/api/auth/signin',
      payload: { email, password },
    });

    console.log({ data });

    if (isError) {
      setError(data);
    } else {
      setError(null);
      previous ? router.replace(previous) : router.replace('/');
      dispatch(doLogin(data));
    }
  };

  return (
    <div>
      <Head title="signin" />
      <div className="container">
        <EmailPasswordForm onSubmit={onSubmit} type="signin" error={error} />
      </div>
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

export default Signin;
