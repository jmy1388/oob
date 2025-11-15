import React from 'react';
import { PenSquare } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <PenSquare className="h-7 w-7 text-primary" />
      <span className="font-headline text-2xl font-bold text-primary">
        oob
      </span>
    </div>
  );
};

export default Logo;
