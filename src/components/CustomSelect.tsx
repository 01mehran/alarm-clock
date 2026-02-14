import { useState } from 'react';

interface ICustomTimeSelect {
  onChange: (value: string) => void;
  value: string;
  type: 'hour' | 'minutes';
  disabled?: boolean;
}

function CustomSelect({ onChange, value, type, disabled }: ICustomTimeSelect) {
  const [isOpen, setIsOpen] = useState(false);
  const items = type === 'hour' ? 24 : 60;

  const toggeOpen = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSeclet = (num: number): void => {
    const formattedValue = num.toString().padStart(2, '0');
    onChange(formattedValue);
    setIsOpen(false);
  };

  const dispalyText = value || (type === 'hour' ? 'Hour' : 'Minutes');

  return (
    <div className="relative flex w-full flex-col gap-2">
      <div
        onClick={toggeOpen}
        className={`${disabled ? 'pointer-events-none opacity-50' : ''} selectEl control-wrapper w-full cursor-pointer rounded-sm`}
      >
        {dispalyText}
      </div>

      {isOpen && !disabled && (
        <ul className="absolute top-14 z-10 h-42 w-full overflow-scroll rounded-sm bg-blue-500 px-3 py-1.5 text-white">
          {Array.from({ length: items }, (_, i) => {
            const itemValue = i.toString().padStart(2, '0');
            return (
              <li
                className={`${value === itemValue ? 'font-semibold text-red-600' : ''} cursor-pointer tracking-wider`}
                key={i}
                onClick={() => handleSeclet(i)}
              >
                {itemValue}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
