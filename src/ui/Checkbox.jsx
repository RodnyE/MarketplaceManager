
import { insertStyles } from "../utils/styles"

insertStyles(`
.form-check-input {
  margin: 0;
}
`);

export default function Checkbox ({id, color, checked, onInput}) {
    return (
        <input 
           className={
              "form-check-input m-0 " 
              + (color === "success" ? " is-valid" : "")
              + (color === "danger" ? " is-invalid" : "")
           }
           id={id}
           type="checkbox" 
           checked={checked}
           onChange={onInput}
        />
    )
}