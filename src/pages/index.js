import React, {useState} from "react"
import "../index.sass"
import InfoOverlay from "../InfoOverlay"
import TdButton from "../TdButton"
import RSVPOverlay from "../overlays/RSVPOverlay"
import { v4 as uuidv4 } from 'uuid';

const mainButtons = {
  width: "100px",
  height: "70px",
  margin: "0 100px 0 100px",
}

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}

const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};


const IndexPage = (props) => {
  const [overlayIsActive, setOverlayIsActive] = useState(false);
  const [rsvpKey, setRsvpKey] = useState(uuidv4());
  console.log('rsvpKey', rsvpKey);
  const resetRsvpForm = () => {
    setRsvpKey(uuidv4());
    console.log("RESETTING!!!");
  }

  return (
    <>
       { overlayIsActive &&
        <InfoOverlay
          key={rsvpKey}
          closeOverlay={() => setOverlayIsActive(false)}
          overlayContent={RSVPOverlay}
        >
          <RSVPOverlay
            closeOverlay={() => setOverlayIsActive(false)}
            resetForm={resetRsvpForm}
          />
        </InfoOverlay> 


      }
      <main style={mainStyle}>
      
        <div className="houseBounds">
          <div className="gable"></div>
          <div className="gablePoint"></div>
          <div className="houseBorder"></div>
          <div className="content">
              <div className="navContainer1">
                <table>
                  <tbody>
                    <tr>
                      <td colSpan="2" rowSpan="2" >
                      <div className="titleBox">
                        <h1 className="titleName">Madeline Rose<br/>Cunningham</h1>
                        <h3 className="titleSub">and</h3>
                        <h1 className="titleName">Colin James<br/>Willson</h1>
                      </div>
                      </td>
                    </tr>
                    <tr>
                    <td className="dateCell" rowSpan="3"><p>October 7, 2023</p></td>
                    </tr>
                    <tr>
                      <TdButton
                        colSpan="2"
                        activateOverlay={() => setOverlayIsActive(true)}
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
                      <TdButton>
                        <h3>Events</h3>
                      </TdButton>
                    </tr>
                    <tr>
                      <TdButton
                        colSpan="2"
                      >
                        <h3>Planning Ahead</h3>
                      </TdButton>
                      <TdButton>
                        <h3>FAQ</h3>
                      </TdButton>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </main>
   </> 
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
