import NextHead from 'next/head';

interface HeadProps {
  title: string;
}

const Head: React.FC<HeadProps> = ({ title }) => {
  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  );
};

export default Head;
