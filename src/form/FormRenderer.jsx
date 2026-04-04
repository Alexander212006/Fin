import { FormField } from "./FormField";

export const FormRenderer = ({ fields, values, onChange, idPrefix }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={values[field.name] ?? ""}
          onChange={onChange}
          idPrefix={idPrefix}
        />
      ))}
    </div>
  );
};
