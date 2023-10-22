import { useState } from "react";
import {
  AnyObject,
  ObjectSchema,
  ValidationError,
  CreateErrorOptions,
} from "yup";

const createErrorsObjects = (
  errors: CreateErrorOptions[],
  callBackFunction: (v: AnyObject) => void
) => {
  const errorsObject = errors.reduce(
    (mergedErrorsObject = {}, validationError: CreateErrorOptions) => {
      if (!validationError.path) {
        return {};
      }
      return {
        ...mergedErrorsObject,
        [validationError.path]: validationError,
      };
    },
    {}
  );

  return callBackFunction(errorsObject);
};

/**
 * useMrUseForm handle formSubmit and onChange inputs.
 * @param {T} initialValues - this for initiate form inputs in first load
 * @param {ObjectSchema<AnyObject>} schema - validation schema object by yup
 */

const useMrUseForm = <T,>(
  initialValues: T,
  schema: ObjectSchema<AnyObject>
) => {
  const [formInputs, setFormInputs] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: CreateErrorOptions }>(
    {}
  );

  const handleFormSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
    formData?: T
  ) => {
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
        createErrorsObjects(inner, setErrors);
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
