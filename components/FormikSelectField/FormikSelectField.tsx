import { useField } from 'formik';
import Select from 'react-select';
import { TAG } from '@/constants';

type Option = { label: string; value: TAG };
interface SelectFieldProps {
  name: string;
  options: Option[];
  className?: string;
  onChange?: (value?: TAG) => void;
}

export function SelectField({
  name,
  options,
  className,
  onChange,
}: SelectFieldProps) {
  const [field, , helpers] = useField<TAG>(name);

  const selected = options.find(opt => opt.value === field.value) || null;

  return (
    <Select<Option>
      instanceId="tag-select"
      inputId={name}
      name={name}
      className={className}
      options={options}
      value={selected}
      onChange={option => {
        const value = option ? option.value : options[0].value;
        helpers.setValue(value);
        if (onChange) {
          onChange(value);
        }
      }}
      onBlur={() => helpers.setTouched(true)}
      isClearable
    />
  );
}
