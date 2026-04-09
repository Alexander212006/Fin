export const FormField = ({ field, value, onChange, idPrefix = "field" }) => {
  const {
    name,
    label,
    type = "text",
    placeholder,
    required = false,
    options = [],
    rows = 4,
    colSpan = "1",
  } = field;

  const id = `${idPrefix}-${name}`;
  const wrapperClassName = colSpan === "2" ? "sm:col-span-2" : "";
  const sharedClassName =
    "w-full rounded-2xl border border-zinc-300 dark:border-zinc-600 px-4 py-3 text-sm outline-none transition focus:border-sky-500 sm:text-base";

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
        {label}
      </label>

      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={sharedClassName}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`${sharedClassName} resize-none`}
          placeholder={placeholder}
          required={required}
        />
      ) : null}

      {type !== "select" && type !== "textarea" ? (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={sharedClassName}
          placeholder={placeholder}
          required={required}
        />
      ) : null}
    </div>
  );
};
