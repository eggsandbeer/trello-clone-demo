// TODO October 23, 2022. Should probably break this down into label, input wrapper
// components for more reuseability and consistency.

export const FormTextInput = ({ id, name, value, label, onChange, placeholder }) => {
  return (
    <div className="mb-8 w-full">
      <input
        type="text"
        name={name}
        id={id}
        className="text-md peer block w-full appearance-none border-0 border-b-2 border-slate-300 bg-transparent px-0 pb-1 pt-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 "
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
      />
      <label className="text-sm text-slate-500 duration-300 peer-placeholder-shown:translate-y-0 peer-focus:left-0 peer-focus:-translate-y-6  peer-focus:text-blue-600">
        {label}
      </label>
    </div>
  );
};
