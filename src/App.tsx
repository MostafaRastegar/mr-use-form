import { object, string, number, date, InferType } from "yup";
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
  const { formInputs, handleOnChange, handleFormSubmit, error } =
    useMrUseForm<FormInputs>(initialFormInputs, userSchema);
  console.log("error :>> ", error);
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
          errorMessage={error.name === "firstName" ? error.message : ""}
        />

        <Input
          type="text"
          name="lastName"
          label="Last Name"
          onChange={handleOnChange}
          value={formInputs.lastName}
          placeholder="enter your last name"
          errorMessage={error.name === "lastName" ? error.message : ""}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
