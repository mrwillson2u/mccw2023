import * as React from "react"
import './EventsOverlay.sass'
import OverlayHeader from "../OverlayHeader"



const EventsOverlay = (props) => {
  
  return (
    <>
      <OverlayHeader>
        <h3>Schedule of Events</h3>
      </OverlayHeader>
    
      <div className="contentContainer">
        <h4>Welcome Party</h4>
        <p>
          <strong>Theme: </strong>Tailgate<br/>
          <strong>Attire: </strong>Casual<br/>
          <strong>Time: </strong>5:00 pm - 10:00 pm<br/>
          <strong>Location: </strong>Sonom Coast Villa
          </p>
        <p>
          We’re celebrating Maddie’s country farm roots by having a tailgate party! 
          There will be a variety of fun games on the lawn for people to connect 
          with new and old friends. Some of the games that will be played include 
          cornhole, ladder toss, and horseshoes. The party starts at noon and goes 
          until dark, so come on out and enjoy some good food, fun, and fellowship!
        </p>

        <h4>Ceremony</h4>
        <p>
          <strong>Attire: </strong>Be your best self!<br/>
          <strong>Time: </strong>TBD<br/>
          <strong>Location: </strong>Bodega Bay Trailhead
        </p>
        <p>
          We cordially invite you to join us for our exchange of vows, to be held on 
          the beautiful rocky coast of California. The ceremony will take place just 
          before sunset on a cliff, with the waves crashing against the shore in the 
          background. We hope you can join us for this special day as we celebrate 
          our love and commitment to each other.
        </p>
        <p>
          The wedding will be an intimate affair with the people in our lives we feel helped us become who we are today
        </p>

        <h4>Reception</h4>
        <p>
          <strong>Attire: </strong>Be your best self!<br/>
          <strong>Time: </strong>TBD<br/>
          <strong>Location: </strong>Sonoma Coasy Villa
          </p>
        <p>
          All there is left to do at this point it is celebrate our wedding with food, 
          dancing, and all you lovely people! We will have plenty of food and drinks, 
          as well as a dance floor for those who want to get their groove on. We can't 
          wait to see you there!
        </p>

        <h4>Farewell Brunch</h4>
        <p>
          <strong>Attire: </strong>Casual<br/>
          <strong>Time: </strong>8:00 am - 10:30 am<br/>
          <strong>Location: </strong>Sonoma Coast Villa
        </p>
        <p>
          As the festivities come to an end, come say goodbye and let us thank you for celebrating with us!
        </p>
        
      </div>
    </>
  )
}

export default EventsOverlay

