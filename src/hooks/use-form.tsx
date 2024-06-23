import { ChangeEvent, useState } from "react";

type FormFormatter<T> = Partial<
  Record<keyof T, (e: ChangeEvent<HTMLInputElement>) => any>
>;
type FormErrors<T> = Partial<Record<keyof T, string | null>>;

const useForm = <T extends Record<string, any>>(
  initialState: T,
  initialFormFormatter: FormFormatter<T> = {},
  initialErrors: FormErrors<T> = {}
) => {
  const [formState, setFormState] = useState(initialState);
  const [formFormatter, setFormFormatter] = useState(initialFormFormatter);
  const [errors, setErrors] = useState<FormErrors<T>>(initialErrors);

  const handleChange =
    (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = formFormatter[field]
        ? formFormatter[field]!(e)
        : e?.target?.value || "";
      setFormState({ ...formState, [field]: value });
      setErrors({ ...errors, [field]: null });
    };
  return {
    formState,
    errors,
    setErrors,
    handleChange,
    setFormState,
    setFormFormatter,
  };
};

export default useForm;
