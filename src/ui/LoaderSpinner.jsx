
import { insertStyles } from "utils/styles"

insertStyles(`
.loader {
  --loader-color: var(--bs-primary);
  --loader-width: 80px;
  
  border: 10px solid transparent;
  border-top: 10px solid var(--loader-color);
  border-radius: 50%;
  width: var(--loader-width);
  height: var(--loader-width);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`);

export default function LoaderSpinner ({width}) {
    return (
        <div className="loader"/>
    )
}