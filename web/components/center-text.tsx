interface CenterTextProps {
  title: string;
}

const CenterText: React.FC<CenterTextProps> = ({ title }) => {
  return (
    <div className="centerBox">
      <h1 className="centerText">{title}</h1>
    </div>
  );
};

export default CenterText;
