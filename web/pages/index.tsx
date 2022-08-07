import CenterText from '../components/center-text';
import Head from '../components/head';
import styles from '../styles/common.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head title="TicketCreature" />
      <CenterText title="Get Tickets Now!" href="/tickets" />
    </div>
  );
};

export default Home;
