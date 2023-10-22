import { object, string } from "yup";
import "./App.css";
import useMrUseForm from "./libs/useMrUseForm";
import Input from "./components/Input";

let userSchema = object().shape({
  lastName: string().required("lastName is required"),
  firstName: string().required("firstName is required"),
});

interface FormInputs {
  firstName: string;
  lastName: string;
}
const initialFormInputs = {
  firstName: "",
  lastName: "",
};

function App() {
  const { formInputs, handleOnChange, handleFormSubmit, errors } =
    useMrUseForm<FormInputs>(initialFormInputs, userSchema);
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <Input
          type="text"
          name="firstName"
          label="First Name"
          onChange={handleOnChange}
          value={formInputs.firstName}
          placeholder="enter your first name"
          errorValidation={errors["firstName"]?.message}
        />

        <Input
          type="text"
          name="lastName"
          label="Last Name"
          onChange={handleOnChange}
          value={formInputs.lastName}
          placeholder="enter your last name"
          errorValidation={errors["lastName"]?.message}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
