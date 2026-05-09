import { ILoginFormState } from "@/formHelpers/formTypes";
import { LoginFormValidationResult } from "@/utils/forms/FormHelpers";
import { useState } from "react";

//Custom hook for Login Form
const useLoginForm = (initialValues: {
  userName: string;
  password: string;
  resetPassword: boolean;
}) => {
  const [formState, setFormState] = useState<ILoginFormState>({
    userName: { value: initialValues.userName, error: "", touched: false },
    password: { value: initialValues.password, error: "", touched: false },
    resetPassword: false,
    validForSubmit: false,
  });

  const handleBlur = (field: string) => {
    setFormState((prev) => {
      // 1. Tell TS 'field' is definitely one of the object keys
      const fieldKey = field as keyof typeof prev;

      // 2. Ensure we only spread if it's NOT the boolean 'validForSubmit'
      if (fieldKey === "validForSubmit" || fieldKey === "resetPassword")
        return prev;

      return {
        ...prev,
        [fieldKey]: {
          ...prev[fieldKey], // Now TS knows this is the { error: string } object
          touched: true,
        },
      };
    });
  };

  const handleInputChange = (field: string, value: string) => {
    let input = value;
    setFormState((prev) => {
      const newState = {
        ...prev,
        [field]: {
          value: input,
        },
      };

      return { ...newState };
    });

    let result = LoginFormValidationResult(field, value);

    if (result) {
      setFormState((prev) => {
        const fieldKey = field as keyof typeof prev;

        // 2. Safety check: Don't spread if it's the boolean 'validForSubmit'
        if (fieldKey === "validForSubmit" || fieldKey === "resetPassword")
          return prev;

        // 3. Perform the update
        const newState = {
          ...prev,
          [fieldKey]: {
            ...prev[fieldKey], // Now TS knows this is an object { error: string, ... }
            error: result,
            touched: true,
          },
        };

        // 4. Recalculate validForSubmit (Exclude it from the loop)
        const isFormValid =
          newState.userName.error === "" &&
          newState.userName.value.trim() !== "" &&
          newState.password.error === "" &&
          newState.password.value.trim() !== "";
        return {
          ...newState,
          validForSubmit: isFormValid,
        };
      });
    } else {
      setFormState((prev) => {
        const newState = {
          ...prev,
          [field]: {
            value,
            error: "",
            touched: true,
          },
        };
        // Update validForSubmit based on all fields
        const isFormValid =
          newState.userName.error === "" &&
          newState.userName.value.trim() !== "" &&
          newState.password.error === "" &&
          newState.password.value.trim() !== "";

        return { ...newState, validForSubmit: isFormValid as any };
      });
    }
  };

  return {
    formState,
    handleInputChange,
    handleBlur,
  };
};

export default useLoginForm;
