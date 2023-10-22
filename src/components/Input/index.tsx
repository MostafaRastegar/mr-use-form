import { useMemo } from "react";
interface CustomInputProps {
  type: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  errorValidation?: unknown;
  [key: string]: unknown;
}
const showErrorMessage = (message: string) =>
  !!message ? <p className="error">{message}</p> : null;

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  value,
  onChange,
  name,
  errorValidation,
  label,
  ...rest
}) => {
  const memoInput = useMemo(() => {
    return (
      <div className="input-field">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          {...rest}
        />
        {showErrorMessage(errorValidation as string)}
      </div>
    );
  }, [value, errorValidation]);
  return memoInput;
};
export default CustomInput;
