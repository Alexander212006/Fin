export const SelectField = ({
  label,
  icon: Icon,
  value,
  onChange,
  options,
}) => {


  return (
    <label className="block">
      <span className="mb-3 block text-sm font-medium text-zinc-700 sm:text-base">
        {label}
      </span>
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-[#fafafa] px-4 py-3 transition focus-within:border-zinc-300 focus-within:bg-white">
        <Icon className="h-5 w-5 text-zinc-400" />
        <select
          value={value || ""}
          onChange={onChange}
          className="w-full bg-transparent text-sm text-zinc-800 outline-none sm:text-base"
        > 
        <option value="">Select a {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};
