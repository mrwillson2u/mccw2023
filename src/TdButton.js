import * as React from "react"
import {useState} from "react"
import './index.sass'
import './TdButton.sass'

const TdButton = (props) => {

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  
  const handleClick = () => {
    console.log("CLICKED!", props.activateOverlay);
   if(props.activateOverlay) {
    props.activateOverlay();
   }

    if(props.navigateTo) {
      openInNewTab(props.navigateTo)
    }
  }

  return (
      <td 
        colSpan={props.colSpan}
        rowSpan={props.rowSpan}
        className={`${ mouseIsOver ? 'hover' : '' }`}
        onMouseOver={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        onClick={handleClick}
      >
        {props.children}
      </td>
    
  )
}

export default TdButton

