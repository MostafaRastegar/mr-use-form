import { useState } from "react";
import { AnyObject, ObjectSchema } from "yup";

const useSignUpForm = <T,>(
  initialFormInputs: T,
  schema: ObjectSchema<AnyObject>
) => {
  const [formInputs, setFormInputs] = useState<T>(initialFormInputs);
  const [error, setError] = useState({
    name: "",
    message: "",
  });

  const handleFormSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    if (event) {
      event.preventDefault();

      try {
        const result = await schema.validate(formInputs);
        setError({
          name: "",
          message: "",
        });
        return result;
      } catch (errors) {
        const { path, message } = JSON.parse(JSON.stringify(errors));
        setError({
          name: path,
          message: message,
        });
      }
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setFormInputs((formInputs) => ({
      ...formInputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleFormSubmit,
    handleOnChange,
    formInputs,
    error,
  };
};

export default useSignUpForm;
