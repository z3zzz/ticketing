import NextLink from 'next/link';

interface LinkProps {
  href: string;
  title: string;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, title, className }) => {
  return (
    <NextLink href={href}>
      <a className={className}>{title}</a>
    </NextLink>
  );
};

export default Link;
