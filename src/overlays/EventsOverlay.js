import * as React from "react"
import './EventsOverlay.sass'
import OverlayHeader from "../OverlayHeader"



const EventsOverlay = (props) => {
  
  return (
    <div className="scrollBox">
      <OverlayHeader>
        <h3>Schedule of Events</h3>
      </OverlayHeader>
    
      <div className="contentContainer">
        <h4>Welcome Party</h4>
        <p>
          <strong>Attire: </strong>Casual<br/>
          <strong>Time: </strong>5:00 pm - 10:00 pm<br/>
          <strong>Location: </strong>Sonoma Coast Villa
          </p>
        <p>
          It’s 5’oclock somewhere, so let's kick off the wedding weekend with a 
          laid-back tailgate! Bring your appetite for a delightful dinner and your 
          playfulness for lighthearted competition. 
        </p>
        <p>
          Be sure to wear comfortable shoes/sandals and we’ll put a drink in your 
          hand. We can’t wait to see you there!
        </p>

        <h4>Ceremony</h4>
        <p>
          <strong>Attire: </strong>Feel Fabulous!<br/>
          <strong>Time: </strong>3:30pm<br/>
          <strong>Location: </strong>Bodega Bay Trailhead
        </p>
        <p>
          We joyfully invite you to join us for our exchange of vows overlooking the 
          beautiful rocky coast of California. We hope to share our commitment to each 
          other with the people in our lives who have contributed to who we are today.
          Please join us for this special day as we celebrate our love and promise to 
          each other.<br />

          The ceremony will take place just before sunset at the Bodega Bay Trailhead.
          Please see the FAQ section for attire and helpful notes.
        </p>

        <h4>Reception</h4>
        <p>
          <strong>Time: </strong>5:00pm<br/>
          <strong>Location: </strong>Sonoma Coast Villa
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
    </div>
  )
}

export default EventsOverlay

