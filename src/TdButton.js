import React, {useState} from "react"
import './index.sass'
import './TdButton.sass'

const TdButton = (props) => {

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  
  const handleClick = () => {
    if(props.navigateTo) {
      openInNewTab(props.navigateTo)
    }
  }

  return (
      <td 
        colSpan={props.colSpan}
        rowSpan={props.rowSpan}
        className={`${ mouseIsOver ? 'hover' : '' }`}
        // className="hover"
        onMouseOver={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        onClick={handleClick}
      >
        {props.children}
      </td>
    
  )
}

export default TdButton

