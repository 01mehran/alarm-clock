import { useState } from 'react';
import { FormatTime } from '../utils/FormatTime';

import { VscChevronDown } from 'react-icons/vsc';
// Type;
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
        className={`${disabled ? 'pointer-events-none opacity-50' : ''} selectEl control-wrapper flex w-full cursor-pointer items-center justify-between rounded-sm`}
      >
        <span>{dispalyText}</span>
        <span
          className={`${isOpen ? 'rotate-180' : 'rotate-0'} text-xl transition-all duration-200 ease-in-out`}
        >
          <VscChevronDown />
        </span>
      </div>

      {isOpen && !disabled && (
        <ul
          style={{ scrollbarWidth: 'none' }}
          className="absolute top-13 z-10 h-42 w-full overflow-scroll rounded-sm bg-blue-500 px-3 py-1.5 text-white shadow-[0_3px_10px_rgba(0,0,0,.2)]"
        >
          {Array.from({ length: items }, (_, i) => {
            const itemValue = FormatTime(i);
            return (
              <li
                className={`${value === itemValue ? 'text-xl font-semibold text-orange-700 hover:scale-100 hover:text-orange-700' : ''} transform cursor-pointer border-b border-b-white/50 pt-2 tracking-wider transition-all duration-200 hover:scale-95 hover:text-orange-700`}
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
