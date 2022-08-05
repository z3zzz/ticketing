import styles from './center-text.module.scss';
import NextLink from 'next/link';

interface CenterTextProps {
  title: string;
  href?: string;
}

const CenterText: React.FC<CenterTextProps> = ({ title, href }) => {
  return (
    <div className={styles.box}>
      {href ? (
        <NextLink href={href}>
          <a>
            <h1 className={styles.text}>{title}</h1>
          </a>
        </NextLink>
      ) : (
        <h1 className={styles.text}>{title}</h1>
      )}
    </div>
  );
};

export default CenterText;
