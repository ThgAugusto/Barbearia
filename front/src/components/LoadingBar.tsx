import React, { useState, useEffect } from 'react';

interface LoadingBarProps {
  isLoading: boolean;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number | null = null; 

    if (isLoading) {
      interval = window.setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 95)); 
      }, 200);
    } else if (!isLoading && progress > 0) {
      setProgress(100);
    }

    return () => {
      if (interval !== null) clearInterval(interval); 
    };
  }, [isLoading, progress]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 shadow-md">
      <div
        className="h-full bg-blue-600 transition-all duration-300 shadow-lg"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LoadingBar;
