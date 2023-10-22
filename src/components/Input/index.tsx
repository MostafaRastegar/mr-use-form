interface InputProps {
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

/**
 * Input kit for easy handle onChange and showing validation error
 */
const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  name,
  errorValidation,
  label,
  ...rest
}) => (
  <div className="input-field">
    <label htmlFor={name}>{label}</label>
    <input type={type} onBlur={onChange} name={name} {...rest} />
    {showErrorMessage(errorValidation as string)}
  </div>
);

export default Input;
