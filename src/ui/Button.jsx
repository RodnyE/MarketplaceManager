
export default function Button ({onClick, children, disabled}) {
    return (
      <div 
        onClick={onClick} 
        className={
          "btn btn-primary fw-bold" 
          + (disabled ? " disabled" : "")
        }
      > 
        {children} 
      </div>
    )
}