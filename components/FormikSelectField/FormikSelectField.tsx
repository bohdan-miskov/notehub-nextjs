import { useField } from 'formik';
import Select from 'react-select';

type Option = { label: string; value: string };
interface SelectFieldProps {
  name: string;
  options: Option[];
  className?: string;
  onChange?: (value?: string) => void;
}

export function SelectField({
  name,
  options,
  className,
  onChange,
}: SelectFieldProps) {
  const [field, , helpers] = useField<string>(name);

  const selected = options.find(opt => opt.value === field.value) || null;

  return (
    <Select
      instanceId="tag-select"
      inputId={name}
      name={name}
      className={className}
      options={options}
      value={selected}
      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
      maxMenuHeight={170}
      onChange={option => {
        const value = option ? option.value : options[0].value;
        helpers.setValue(value);
        if (onChange) {
          onChange(value);
        }
      }}
      onBlur={() => helpers.setTouched(true)}
      isClearable

      // styles={{
      //   // Додатково гарантуємо високий z-index для меню
      //   menuPortal: base => ({ ...base, zIndex: 9999 }),
      // }}
    />
  );
}
