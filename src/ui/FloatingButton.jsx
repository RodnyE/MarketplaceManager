
import { insertStyles } from "utils/styles"

insertStyles(`
.btn-fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  
  width: 60px;
  height: 60px;
}  
`);

export default function FloatingButton ({onClick, children, content, disabled}) {
    return (
      <div 
        onClick={onClick} 
        className={
          "btn btn-fab fw-bold fs-1 rounded-circle d-flex align-items-center justify-content-center btn-outline-primary fw-bold" 
          + (disabled ? " disabled" : "")
        }
      > 
        {content || children} 
      </div>
    )
}