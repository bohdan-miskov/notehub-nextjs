import { useField } from 'formik';
import Select from 'react-select';
import { TAG } from '@/constants';

type Option = { label: string; value: TAG };

interface SelectFieldProps {
  name: string;
  options: Option[];
  className?: string;
}

export function SelectField({ name, options, className }: SelectFieldProps) {
  const [field, , helpers] = useField<TAG>(name);

  const selected = options.find(opt => opt.value === field.value) || null;

  return (
    <Select<Option>
      inputId={name}
      name={name}
      className={className}
      options={options}
      value={selected}
      onChange={option =>
        helpers.setValue(option ? option.value : options[0].value)
      }
      onBlur={() => helpers.setTouched(true)}
      isClearable
    />
  );
}
