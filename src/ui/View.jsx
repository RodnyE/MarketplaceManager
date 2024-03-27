
import { useState, useEffect, useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import './View/style.css';

export default function View ({show, className, children, onExited}) {
    const nodeRef = useRef(null);
    
    return (
      <CSSTransition
        in={show}
        timeout={300}
        nodeRef={nodeRef}
        classNames="view"
        unmountOnExit={true}
      >
        <div ref={nodeRef} className={`view ${className}`}>
            {children}
        </div>
      </CSSTransition>
    );
}