import React, { useEffect, useRef } from 'react';
import jazzicon from 'jazzicon';

interface IdenticonProps {
  address: string;
  size: number;
}

const Identicon: React.FC<IdenticonProps> = ({ address, size }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (address && ref.current) {
      const diameter = size;
      const seed = parseInt(address.slice(2, 10), 16);
      const icon = jazzicon(diameter, seed);
      if (ref.current.firstChild) {
        ref.current.removeChild(ref.current.firstChild);
      }
      ref.current.appendChild(icon);
    }
  }, [address, size]);

  return <div ref={ref} style={{ width: size, height: size }} />;
};

export default Identicon;
