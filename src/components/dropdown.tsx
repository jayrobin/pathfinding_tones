import React from 'react';

type Props = {
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ value, options, onChange }: Props) => {
  return (
    <select value={value} onChange={onChange} style={styles.select}>
      {options.map((option) => {
        return <option key={option} value={option}>{option}</option>
      })}
    </select>
  )
}

const styles = {
  select: {
    width: '100%',
    padding: '10px',
  },
};

export default Dropdown;
