import React, { useState } from 'react';

const LazyImage = ({ src, placeholder, alt, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ width, height, borderRadius: '50%', position: 'relative', overflow: 'hidden' }}>
      {/* Placeholder */}
      <img
        src={placeholder}
        alt="placeholder"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(10px)',
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.3s ease',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default LazyImage;
