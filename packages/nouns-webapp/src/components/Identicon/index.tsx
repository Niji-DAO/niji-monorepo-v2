import React, { useEffect, useRef } from 'react';
import jazzicon from 'jazzicon';

interface IdenticonProps {
  address: string;
  size: number;
}

const Identicon: React.FC<IdenticonProps> = ({ address, size }) => {
  if (!address) {
    return (
      <div 
        style={{ 
          width: size, 
          height: size,
          backgroundColor: '#f0f0f0',
          borderRadius: '50%',
          display: 'inline-block'
        }} 
      />
    );
  }

  // Generate colors based on address
  const seed = parseInt(address.slice(2, 10), 16);
  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9'
  ];
  const bgColor = colors[seed % colors.length];
  const textColor = '#fff';

  return (
    <div 
      style={{ 
        width: size, 
        height: size,
        backgroundColor: bgColor,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 'bold',
        color: textColor,
        fontFamily: 'monospace'
      }} 
    >
      {address.slice(2, 4).toUpperCase()}
    </div>
  );
};

export default Identicon;
