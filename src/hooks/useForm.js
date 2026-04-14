import { useCallback, useState } from "react";

export const useForm = (
  INITIAL_FORM_STATE
) => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [file, setFile] = useState(null);

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM_STATE);
    setFile(null);
  }, [INITIAL_FORM_STATE]);

  const updateField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { form, setForm, file, setFile, resetForm, updateField };
};
