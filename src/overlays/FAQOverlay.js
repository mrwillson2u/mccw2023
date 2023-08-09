import * as React from "react"
import './FAQOverlay.sass'
import OverlayHeader from "../OverlayHeader"
import Drawer from "../Drawer"


const FAQOverlay = (props) => {
  
  return (
    <div className="scrollBox">
      <OverlayHeader>
        <h3>FAQ</h3>
      </OverlayHeader>

      <div className="contentContainer">
        <Drawer
          headerText="1. What time should I arrive to the ceremony?"
        >
          <p>
          While the official wedding ceremony start time is 3:30pm, we recommend that guests arrive 15 minutes or so before.
        </p>
        </Drawer>
        
        <Drawer
          headerText="2. What is the dress code?"
        >
          <p>
            As we exchange our vows against the backdrop of a breathtaking sunset, we ask guests to avoid gold attire.
          </p>
          <p>
            Embrace your inner Met Gala and don't be afraid to be EXTRA! Feel free to wear what makes you feel absolutely fabulous. We can't wait to see your unique styles shining as we celebrate together.
          </p>
        </Drawer>

        <Drawer
          headerText="3. Will the ceremony, cocktail hour, and reception take place indoors or outdoors?"
        >
          <p>
            All events will be held outdoors
          </p>
        </Drawer>
        <Drawer
          headerText="4. What will the weather be like?"
        >
          <p>
            Expect it to be hot. The ceremony by the sea will be windy.
          </p>
        </Drawer>
        <Drawer
          headerText="5. How do I get to the wedding venue? Will transportation be provided?"
        >
          <p>
            TBD
          </p>
        </Drawer>
        <Drawer
          headerText="6. Is there parking available at the ceremony site (Bodega Bay Trailhead)?"
        >
          <p>
            Yes
          </p>
        </Drawer>
        <Drawer
          headerText="7. Is there parking available at the reception site (Sonoma Coast Villa)?"
        >
          <p>
            There is limited parking available
          </p>
        </Drawer>
        <Drawer
          headerText="8. Can I bring my kids?"
        >
          <p>
            To allow all of our guests the opportunity to relax and enjoy themselves, we have decided to make our wedding an adult-only weekend.
          </p>
        </Drawer>
        <Drawer
          headerText="9. What type of food and drink will be served?"
        >
          <p>
          Passed hors d'oeuvres will be served during cocktail hour, followed by dinner by Cocina Danzon.
          </p>
        </Drawer>
        <Drawer
          headerText="10. I have dietary restrictions/allergies. What's the best way to let you know?"
        >
          <p>
            Guests with dietary restrictions and/or allergies should specify them in the RSVP portal.
          </p>
        </Drawer>
        <Drawer
          headerText="11. Will there be an open bar?"
        >
          <p>
          Absolutely
          </p>
        </Drawer>
        <Drawer
          headerText="12. When is the RSVP deadline?"
        >
          <p>
            September 1
          </p>
        </Drawer>
        <Drawer
          headerText="13. I'm visiting from out of town. What can I do in Bodega Bay, CA?"
        >
          <p>
            Please visit the Planning Ahead section of our website!
          </p>
        </Drawer>
        <Drawer
          headerText="14. Do you have a wedding registry?"
        >
          <p>
            Please visit the Registry section of our website!
          </p>
        </Drawer>
       <Drawer
          headerText="15. Will there be any other events to attend during the wedding weekend?"
        >
          <p>
            Please visit the Events section of our website!
          </p>
        </Drawer>
        <Drawer
          headerText="16. What's the best way to contact you if I have additional questions?"
        >
          <p>
            Please feel free to text/call us or email us at mccw2023@gmail.com
          </p>
        </Drawer>
      </div>
    </div>
  )
}

export default FAQOverlay

