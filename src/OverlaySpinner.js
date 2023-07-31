import * as React from "react"
import './index.sass'
import './OverlaySpinner.sass'
import { SkewLoader } from "react-spinners"


const StepTracker = (props) => {
  
   return (
    <>
      {
        props.active && <div className="overlayBackground">
          <SkewLoader color="#ff00ea" />
        </div>
      }
    </>
  )
}

export default StepTracker

