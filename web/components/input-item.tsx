import { useState } from 'react';

interface InputItemProps<T> {
  label: string;
  type: 'text' | 'number' | 'password' | 'email';
  initialValue: T;
  setGlobalValue: (newValue: T) => void;
  placeholder?: string;
}

const InputItem: React.FC<InputItemProps<string | number>> = ({
  label,
  type,
  initialValue,
  setGlobalValue,
  placeholder,
}) => {
  const isNumber = type === 'number';
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = isNumber ? parseInt(e.target.value) : e.target.value;

    setValue(newValue);
    setGlobalValue(newValue);
  };

  return (
    <div className="inputItem">
      <label className="label">
        {label}
        <input
          type={type}
          className="input"
          name={label}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default InputItem;
