import * as React from "react"
// import {useState} from "react"
import useBreakpoints, { queryRecieved } from "../useBreakpoint"
import InfoOverlay from "../InfoOverlay"
import TdButton from "../TdButton"
import RSVPOverlay from "../overlays/RSVPOverlay"
import { v4 as uuidv4 } from 'uuid';
import UnderConstruction from "../overlays/UnderConstruction"
import EventsOverlay from "../overlays/EventsOverlay"
import PlanningAheadOverlay from "../overlays/PlanningAheadOverlay"
import FAQOverlay from "../overlays/FAQOverlay"


const useState = React.useState;

const IndexPage = (props) => {
  const [overlayIsActive, setOverlayIsActive] = useState(false);
  const [overlayContent, setOverlayContent] = useState();
  const [rsvpKey, setRsvpKey] = useState(uuidv4());

  const { isXs } = useBreakpoints();
  console.log('queryRecieved', queryRecieved);
  console.log('isXs', isXs);

  console.log('rsvpKey', rsvpKey);
  const resetRsvpForm = () =>  {
    setRsvpKey(uuidv4());
  }

  const activateOverlay = (content) => {
    console.log('testi');
    setOverlayContent(content);
    setOverlayIsActive(true);
  }

  const navTable = () => {
    if(isXs) {
      // Mobile Version
      return(
        <table>
          <tbody>
            <tr>
              <td colSpan="2" className="titleCell">
                <div className="titleCont">
                  <div className="titleBox">
                    <h1 className="titleName">Madeline Rose<br/>Cunningham</h1>
                    <h3 className="titleSub">and</h3>
                    <h1 className="titleName">Colin James<br/>Willson</h1>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <TdButton
                  colSpan="2"
                  activateOverlay={() => { activateOverlay(<RSVPOverlay />) }}
                >
                  <h3>RSVP</h3>
              </TdButton>
            </tr>
            <tr>
            <TdButton
                  activateOverlay={() => { activateOverlay(<EventsOverlay />) }}
                >
                  <h3>Events</h3>
              </TdButton>
              <TdButton
                navigateTo={'https://www.zola.com/registry/colinandmadelineoctober7'}
              >
                  <h3>Registry</h3>
              </TdButton>
            </tr>
            <tr>
              <TdButton
                colSpan="2"
                activateOverlay={() => { activateOverlay(<PlanningAheadOverlay />) }}
              >
                <h3>Planning Ahead</h3>
              </TdButton>
            </tr>
            <tr>
            <TdButton
                colSpan="2"
                activateOverlay={() => { activateOverlay(<FAQOverlay />) }}
              >
                <h3>FAQ</h3>
              </TdButton>
            </tr>
          </tbody>
        </table>
      )
    }
    else {
      // Desktop Version
      return(
        <table>
          <tbody>
            <tr className="tallRow">
              <td></td>
              <td></td>
            </tr>
            <tr className="shortRow">
              <td colSpan={2}>
                <div className="titleBox">
                  <h1 className="titleName">Madeline Rose<br/>Cunningham</h1>
                  <h3 className="titleSub">and</h3>
                  <h1 className="titleName">Colin James<br/>Willson</h1>
                </div>
              </td>
            <td className="dateCell">
              <p>October 7, 2023</p>
            </td>
            </tr>
            <tr>
              <TdButton
                colSpan="2"
                activateOverlay={() => { activateOverlay(<RSVPOverlay />) }}
              >
                <h3>RSVP</h3>
              </TdButton>
              <td></td>
            </tr>
            <tr>
              <TdButton
                navigateTo={'https://www.zola.com/registry/colinandmadelineoctober7'}
              >
                <h3>Registry</h3>
              </TdButton>
              <TdButton
                activateOverlay={() => { activateOverlay(<EventsOverlay />) }}
              >
                <h3>Events</h3>
              </TdButton>
              <td></td>
            </tr>
            <tr>
              <TdButton
                colSpan="2"
                activateOverlay={() => { activateOverlay(<PlanningAheadOverlay />) }}
              >
                <h3>Planning Ahead</h3>
              </TdButton>
              <TdButton
                activateOverlay={() => { activateOverlay(<FAQOverlay />) }}
              >
                <h3>FAQ</h3>
              </TdButton>
            </tr>
          </tbody>
        </table>
      )}
  }

  return (

    <>
      <div></div>
       { overlayIsActive &&
        <InfoOverlay
          key={rsvpKey}
          closeOverlay={() => setOverlayIsActive(false)}
          resetForm={resetRsvpForm}
        >
          {overlayContent}
        </InfoOverlay> 


      }
      {queryRecieved && <div className="mainScroll">
        
        <main>
          <div className="houseBounds">
            <div className="gable"></div>
            <div className="gablePoint"></div>
            <div className="houseBorder"></div>
            <div className="content">
                <div className="navContainer1">
                {navTable()}
                </div>
            </div>
          </div>
        </main>
      </div>}
   </> 
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
