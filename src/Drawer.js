import * as React from "react"
// import { useEffect, useRef } from "react"
import './index.sass'
import './Drawer.sass'
import { FiChevronRight, FiChevronDown } from 'react-icons/fi'

const useState = React.useState;

const Drawer = (props) => {
  
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  const drawerIcon = isOpen ? <FiChevronDown class/> : <FiChevronRight />;

  console.log('drawerIcon', drawerIcon);

  return (
    <div className="drawerContainer">
      <div 
        className="drawerHeader"
        onClick={handleClick}
      >
        {isOpen ? <FiChevronDown className="icon"/> : <FiChevronRight className="icon" />}
        <h4>{props.headerText}</h4>
      </div>
      { isOpen && <div className="drawerContent">
        { props.children }
      </div> }
    </div>
  )
}

export default Drawer

