'use client';

interface TypeButtonProps {
  active?: boolean;
  type: string;
  onChange: (active: boolean) => void;
}

function TypeButton({ active = false, type, onChange }: TypeButtonProps) {
  return (
    <button
      className={`p-4 border ${active && 'bg-blue-500 text-white'}`}
      onClick={() => onChange(!active)}
    >
      {type}
    </button>
  );
}

export { TypeButton, type TypeButtonProps };
