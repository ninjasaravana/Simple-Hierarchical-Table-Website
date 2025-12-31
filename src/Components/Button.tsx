import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type: 'percent' | 'value';
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, type: variant }) => {
  const baseStyle: React.CSSProperties = {
    padding: '6px 12px',
    margin: '0 4px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '12px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    percent: {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
    },
    value: {
      backgroundColor: '#f5f5f5',
      color: '#333',
    },
  };

  return (
    <button
      style={{ ...baseStyle, ...variantStyles[variant], width: 'max-content' }}
      onClick={onClick}
      onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(0.9)')}
      onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
    >
      {label}
    </button>
  );
};

export default Button;