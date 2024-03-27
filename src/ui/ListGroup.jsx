

const ListGroup = ({children}) => {
    return (
      <div className="list-group list-group-flush list-unstyled list-group-striped">
        {children}
      </div>
    )
}

const ListGroupItem = ({children, className, onClick}) => {
 
    return (
      <div 
        className={"list-group-item  list-group-item-action " + className}
        onClick={onClick}
      >
        {children}
      </div>
    )
}

// export
ListGroup.Item = ListGroupItem;
export default ListGroup;