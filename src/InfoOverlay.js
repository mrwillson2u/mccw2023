import React, {useState} from "react"
import './index.sass'
import './infoOverlay.sass'
import CloseButton from "./CloseButton"

const InfoOverlay = () => {
  const [overlayVisible, setOverlayVisible] = useState(true)

  return (
      
      <div className="overlayContainer">
        {overlayVisible && <div className="overlayBack">
          <CloseButton 
            onClick={() => setOverlayVisible(false)}
          />
          
        </div>}
      </div>
    
  )
}

export default InfoOverlay

