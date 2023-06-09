import { TextField } from "@mui/material";

const TextFieldUI = ({ label, value, type, onChange }) => (
  <TextField
    label={label}
    type={type}
    size="small"
    fullWidth
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default TextFieldUI;
