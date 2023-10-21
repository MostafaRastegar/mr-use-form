import { useMemo } from "react";
interface CustomInputProps {
  type: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  errorMessage?: string;
  [key: string]: unknown;
}
const ErrorMessage = ({ message }: { message: string }) => (
  <p className="error">{message}</p>
);

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  value,
  onChange,
  name,
  errorMessage,
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
        {!!errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }, [value, errorMessage]);
  return memoInput;
};
export default CustomInput;
