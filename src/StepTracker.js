import * as React from "react"
// import { useEffect, useRef } from "react"
import './index.sass'
import './StepTracker.sass'

const useEffect = React.useEffect;
const useRef = React.useRef;

const StepTracker = (props) => {
  
  // const [activeStep, setActiveStep] = useState(props.activeStep);
  
  const furthestStepReached = useRef(null);
  
  useEffect(() => {
    furthestStepReached.current = 1; // Default initial value is 1
  }, []);

  // Check if we are further than what it was previously set at
  if(props.activeStep > furthestStepReached.current) {
    console.log('updating:', furthestStepReached.current,  props.activeStep, !(furthestStepReached.current > props.activeStep));
    furthestStepReached.current = props.activeStep;
  }


  const steps = [];
  for(let i = 0; i < props.stepCount; i++) {
    steps.push(
      <div className={`singleStep${(i + 1) === props.activeStep ? ' isActive' : ''}`} ></div>
    )
  }

  const handleButtonNav = (pageOffset) => {
    props.setActiveStep(props.activeStep + pageOffset);
  }

  console.log('====>>>>', furthestStepReached.current,  props.activeStep, !(furthestStepReached.current > props.activeStep));
  return (
      <div className="stepContainer">
        <div className="stepButtonContainer">
          <button onClick={() => handleButtonNav(-1)} hidden={ props.activeStep === 1 } >&#60;</button>
        </div>
          {steps}
        <div className="stepButtonContainer">
          <button onClick={() => handleButtonNav(+1)} hidden={ !(furthestStepReached.current > props.activeStep) }>&#62;</button>
        </div>
      </div>
  )
}

export default StepTracker

