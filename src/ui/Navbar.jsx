
import ArrowLeftIcon from "../icons/ArrowLeftIcon"

export default function Navbar ({children}) {
    return (
      <div className="p-2 navbar bg-body text-body shadow z-3 rounded-bottom-4">
        <div className="container-fluid fs-1 fw-bold">
          {children}
        </div>
      </div>
    )
}

export function NavbarBackButton ({button, onClick, content}) {
    return (
         <Navbar>
          <div className="d-flex align-items-center"> 
            <div 
              className="btn btn-outline-primary"
              onClick={onClick}
            >
              {button || <ArrowLeftIcon width="1.5rem" fill="currentcolor"/> }
            </div>
            
            <div className="ms-2 fs-2"> {content} </div>
          </div>
        </Navbar>
    )
}