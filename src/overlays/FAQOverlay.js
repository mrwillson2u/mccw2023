import * as React from "react"
import './FAQOverlay.sass'
import OverlayHeader from "../OverlayHeader"



const FAQOverlay = (props) => {
  
  return (
    <div className="scrollBox">
      <OverlayHeader>
        <h3>FAQ</h3>
      </OverlayHeader>

      <div className="contentContainer">
        
        <h5>1. What time should I arrive to the ceremony?</h5>
        <p>
          While the official wedding ceremony start time is 4pm, we recommend that guests arrive 15 minutes or so before.
        </p>
        
        <h5>2. What is the dress code?</h5>
        <p>
          As we exchange our vows against the backdrop of a breathtaking sunset, we ask guests to avoid gold attire. 
        </p>
        <p>
          Embrace your inner Met Gala and don't be afraid to be EXTRA! Feel free to wear what makes you feel absolutely fabulous. We can't wait to see your unique styles shining as we celebrate together.
        </p>
        
        <h5>3. Will the ceremony, cocktail hour, and reception take place indoors or outdoors?</h5>
        <p>
          All events will be held outdoors
        </p>

        <h5>4. What will the weather be like?</h5>
        <p>
          Expect it to be hot. The ceremony by the sea will be windy.
        </p>

        <h5>5. How do I get to the wedding venue? Will transportation be provided?</h5>
        <p>
          TBD
        </p>

        <h5>6. Is there parking available at the ceremony site (Bodega Bay Trailhead)?</h5>
        <p>
          Yes
        </p>

        <h5>7. Is there parking available at the reception site (Sonoma Coast Villa)?</h5>
        <p>
          There is limited parking available
        </p>

        <h5>8. Can I bring my kids?</h5>
        <p>
          To allow all of our guests the opportunity to relax and enjoy themselves, we have decided to make our wedding an adult-only weekend.
        </p>

        <h5>9. What type of food and drink will be served?</h5>
        <p>
          Passed hors d'oeuvres will be served during cocktail hour, followed by dinner by Cocina Danzon.
        </p>

        <h5>10. I have dietary restrictions/allergies. What's the best way to let you know?</h5>
        <p>
          Guests with dietary restrictions and/or allergies should specify them in the RSVP portal.
        </p>

        <h5>11. Will there be an open bar?</h5>
        <p>
          Absolutely
        </p>

        <h5>12. When is the RSVP deadline?</h5>
        <p>
          September 1
        </p>

        <h5>13. I'm visiting from out of town. What can I do in Bodega Bay, CA?</h5>
        <p>
          Please visit the Planning Ahead section of our website!
        </p>

        <h5>14. Do you have a wedding registry?</h5>
        <p>
          Please visit the Registry section of our website!
        </p>

        <h5>15. Will there be any other events to attend during the wedding weekend?</h5>
        <p>
          Please visit the Events section of our website!
        </p>

        <h5>16. What's the best way to contact you if I have additional questions?</h5>
        <p>
          Please feel free to text/call us or email us at mccw2023@gmail.com
        </p>
      </div>
    </div>
  )
}

export default FAQOverlay

