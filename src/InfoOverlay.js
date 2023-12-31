import * as React from "react"
import './index.sass'
import './infoOverlay.sass'
import CloseButton from "./CloseButton"
import OverlayHeader from "./OverlayHeader"

const InfoOverlay = (props) => {



  return (
      <div className="overlayContainer">
        <div className="overlayBack">
          <CloseButton 
            className={'upperRight'}
            onClick={() => props.closeOverlay()}
          />
          <div className="overlayContent">
            {React.Children.map(props.children, (child) => {
              return React.cloneElement(child, {
                closeOverlay: props.closeOverlay,
                resetForm: props.resetForm
              })
            })}
          </div>
        </div> 
      </div>
    
  )
}

export default InfoOverlay

