import * as React from 'react';

interface IconDownProps {
  up: boolean;
}

function IconDown({ up }: IconDownProps) {
  return (
    <svg className={`Select-value-icon${up ? ' up' : ''}`} viewBox="0 0 32 32">
      <path d="M27.625 8h-2.344c-0.159 0-0.309 0.078-0.403 0.206l-8.878 12.238-8.878-12.238c-0.094-0.128-0.244-0.206-0.403-0.206h-2.344c-0.203 0-0.322 0.231-0.203 0.397l11.019 15.191c0.4 0.55 1.219 0.55 1.616 0l11.019-15.191c0.122-0.166 0.003-0.397-0.2-0.397z" />
    </svg>
  );
}

export default IconDown;
