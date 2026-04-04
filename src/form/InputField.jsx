export const InputField = ({
  label,
  placeholder,
  icon: Icon,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-medium text-zinc-700 sm:text-base">
        {label}
      </span>
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-[#fafafa] px-4 py-3 transition focus-within:border-zinc-300 focus-within:bg-white">
        <Icon className="h-5 w-5 text-zinc-400" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 sm:text-base"
        />
      </div>
    </label>
  );
};
