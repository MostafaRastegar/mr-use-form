import { useState } from "react";
import {
  AnyObject,
  ObjectSchema,
  ValidationError,
  CreateErrorOptions,
} from "yup";

const createErrorsObject = (
  errors: CreateErrorOptions[],
  callBackFunction: Function
) => {
  const objectErrors = errors.reduce(
    (accumulator = {}, validationError: CreateErrorOptions) => {
      if (!validationError.path) {
        return {};
      }
      return {
        ...accumulator,
        [validationError.path]: validationError,
      };
    },
    {}
  );

  return callBackFunction(objectErrors);
};

const useMrUseForm = <T,>(
  initialFormInputs: T,
  schema: ObjectSchema<AnyObject>
) => {
  const [formInputs, setFormInputs] = useState<T>(initialFormInputs);
  const [errors, setErrors] = useState<{ [key: string]: CreateErrorOptions }>(
    {}
  );

  const handleFormSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
    formData?: T
  ) => {
    if (event) {
      event.preventDefault();
      if (formData) {
        setFormInputs(formData);
      }
      try {
        const result = await schema.validate(formData ?? formInputs, {
          abortEarly: false,
        });
        setErrors({});
        return result;
      } catch (error) {
        if (error instanceof ValidationError) {
          const { inner } = JSON.parse(JSON.stringify(error));
          createErrorsObject(inner, setErrors);
        }
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
    errors,
  };
};

export default useMrUseForm;
