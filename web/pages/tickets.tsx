import { GetStaticProps } from 'next';
import CenterText from '../components/center-text';
import Head from '../components/head';
import styles from '../styles/home.module.scss';

const Tickets: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head title="tickets" />
      <CenterText title="Tickets!" />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      isProtected: true,
      criteria: 'afterLogin',
    },
  };
};

export default Tickets;
