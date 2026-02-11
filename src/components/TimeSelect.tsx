interface ISelectTime {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  type: string;
}

const TimeSelect = ({
  value,
  onChange,
  disabled = false,
  type,
}: ISelectTime) => {
  const items = type === 'hour' ? 24 : 60;
  const label = type === 'hour' ? 'Hour' : 'Minute';

  return (
    <div className="control-wrapper">
      <select
        className={`selectEl ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option defaultValue={label} hidden>
          {label}
        </option>
        {Array.from({ length: items }, (_, i) => {
          const formattedValue = i.toString().padStart(2, '0');
          return (
            <option value={formattedValue} key={formattedValue}>
              {formattedValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TimeSelect;
