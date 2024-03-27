
export default function TextField ({id, placeholder, onInput, type, value, disabled, color}) {
    return (
      <input 
        className={
          "form-control bg-transparent time-2" 
          + (disabled ? " disabled text-secondary" : "")
          + (color === "success" ? " is-valid" : "")
          + (color === "danger" ? " is-invalid" : "")
        }
        disabled={disabled}
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        
        onInput={onInput}
      />
    );
}