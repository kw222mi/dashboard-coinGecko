// components/ui/select.js
const Select = ({ children, onValueChange, defaultValue }) => {
  return (
    <select
      className="p-2 border rounded-md"
      defaultValue={defaultValue}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  );
};

const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export { Select, SelectItem };
