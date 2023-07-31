import * as React from "react"
import './index.sass'
import './infoOverlay.sass'
import CloseButton from "./CloseButton"

const InfoOverlay = (props) => {



  return (
      <div className="overlayContainer">
        <div className="overlayBack">
          <CloseButton 
            className={'upperRight'}
            onClick={() => props.closeOverlay()}
          />
          <div className="overlayContent">
            {props.children}
          </div>
        </div> 
      </div>
    
  )
}

export default InfoOverlay

