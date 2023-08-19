import * as React from "react"
import './PlanningAheadOverlay.sass'
import OverlayHeader from "../OverlayHeader"
import Drawer from "../Drawer"



const PlanAheadOverlay = (props) => {
  
  return (
    <div className="scrollBox">
      <OverlayHeader>
        <h3>Planning Ahead</h3>
      </OverlayHeader>
      <div className="contentContainer">

        <p>Welcome to Bodega Bay, CA!</p>
        <p>
          We are delighted to welcome you to Northern California for our wedding! Here's some essential travel information to ensure you have a wonderful time during your stay.
        </p>
        <ol>

        <h4><li>Venue Info</li></h4>
          <p>
            <strong>Ceremony Venue:</strong><br />
            <br />
            Bodega Bay Trailhead<br />
            Bodega Bay, CA 94923<br />
            <br />
            <strong>Note:</strong> This location doesn’t have an address. Google it by name or <a href="https://goo.gl/maps/ng5Pnfi4M41fmk3L6">click here</a>
          </p>
          <p>
            <strong>Reception Venue:</strong><br />
            <br />
            Sonoma Coast Villa<br/>
            16702 Shoreline Highway<br/>
            Bodega, California 94922<br/>
            707-876-9818
          </p>

        <h4><li>Transportation</li></h4>
          <p>
            <strong>Airports:</strong> The nearest major airport is San Francisco International Airport (SFO), located approximately 70 miles from Bodega Bay. Alternatively, Oakland International Airport (OAK) and Sonoma County Airport (STS) are other options, both around 80 miles away.
          </p>
          <p>
            <strong>Car Rental:</strong> Renting a car is recommended for ease of travel and exploring the picturesque surrounding areas.
          </p>
          <p>
            <strong>Car Pool:</strong> Please note if you would like to carpool on your RSVP. Fewer vehicles on the road is always a good thing.
          </p>
          <p>
            <strong>Car Share:</strong> Lyfts/Ubers can be hard to come by if available at all within Bodega Bay. Please plan for extra time if hailing a carshare.
          </p>
          <h4>Airport to Venue Driving Instructions:</h4>
          <p>Important Note:</p>
          <p>Please be aware that the signal may be poor or intermittent in the valley and surrounding areas. It is advisable to download offline maps or GPS directions before heading to Sonoma Coast Villa to ensure a smooth journey.</p>

          <Drawer
            headerText="San Francisco International Airport (SFO) to Sonoma Coast Villa:"
          >
            <p>The drive may take around 2 hours, depending on traffic and weather conditions.</p>
            <ol>
              <li>Head north on US-101 N from the airport.</li>
              <li>Follow US-101 N for approximately 65 miles.</li>
              <li>Take exit 476B to merge onto CA-12 W toward Sebastopol/Sonoma.</li>
              <li>Continue on CA-12 W for approximately 11 miles.</li>
              <li>Turn right onto CA-1 N/Valley Ford Road.</li>
              <li>Drive for about 8 miles, then turn left onto Bodega Highway.</li>
              <li>After about 1.5 miles, turn right onto Bohemian Highway.</li>
              <li>Drive on Bohemian Highway for approximately 6 miles.</li>
              <li>Turn right onto Coleman Valley Road.</li>
              <li>Sonoma Coast Villa will be on your left after about 2 miles.</li>
            </ol>
          </Drawer>
          <Drawer
            headerText="Oakland International Airport (OAK) to Sonoma Coast Villa:"
          >          
            <p>The drive may take around 1.5 to 2 hours, depending on traffic and weather conditions.</p>
            <ol>
              <li>Merge onto I-880 N via the ramp to Downtown Oakland.</li>
              <li>Follow I-880 N for approximately 23 miles.</li>
              <li>Take exit 31B to merge onto I-580 W toward San Rafael.</li>
              <li>Continue on I-580 W for about 11 miles.</li>
              <li>Take exit 19A for CA-37 W toward Napa.</li>
              <li>Merge onto CA-37 W and continue for approximately 9 miles.</li>
              <li>Take the exit toward Petaluma/Sonoma.</li>
              <li>Merge onto Lakeville Hwy/CA-116 W.</li>
              <li>Follow CA-116 W for about 15 miles, then turn right onto CA-1 N/Valley Ford Road.</li>
              <li>Drive for about 8 miles, then turn left onto Bodega Highway.</li>
              <li>After about 1.5 miles, turn right onto Bohemian Highway.</li>
              <li>Drive on Bohemian Highway for approximately 6 miles.</li>
              <li>Turn right onto Coleman Valley Road.</li>
              <li>Sonoma Coast Villa will be on your left after about 2 miles.</li>
            </ol>
          </Drawer>
          <Drawer
            headerText="Sonoma County Airport (STS) to Sonoma Coast Villa:"
          >
            <p>The drive may take around 30 to 40 minutes, depending on traffic and weather conditions.</p>
            <ol>
              <li>As you exit Sonoma County Airport, turn left onto Airport Blvd.</li>
              <li>Continue on Airport Blvd for about 1.5 miles.</li>
              <li>Turn right onto River Rd.</li>
              <li>Follow River Rd for approximately 10 miles.</li>
              <li>Turn left onto CA-116 W/Gravenstein Hwy S and continue for about 7 miles.</li>
              <li>Merge onto CA-1 S toward Bodega Bay.</li>
              <li>Drive on CA-1 S for about 9 miles.</li>
              <li>Turn right onto Coleman Valley Road.</li>
              <li>Sonoma Coast Villa will be on your right after about 2 miles.</li>
            </ol>
          </Drawer>

          <h4><li>Accommodations:</li></h4>
          <p>Bodega Bay offers various accommodations to suit your preferences, we recommend:</p> 
            <p>
              <strong>The Inn at the Tides</strong><br />
               800 Highway 1<br />
              Bodega Bay, California 94923<br />
              707-876-9818<br />
              <a href="www.innatthetides.com">www.innatthetides.com</a>
            </p>
            

          <h4><li>Weather:</li></h4>
          <p>In October, expect pleasant to warm temperatures with average highs around 65°F (18°C) and lows around 48°F (9°C). The sun is hot and the breeze is cold. Bring layers for cool evenings.</p>

          <h4><li>Dress Code:</li></h4>
          <p>As we exchange our vows against the backdrop of a breathtaking sunset, we ask guests to avoid gold attire.
          Embrace your inner Met Gala and don't be afraid to be EXTRA! Feel free to wear what makes you feel absolutely fabulous. We can't wait to see your unique styles shining as we celebrate together.</p>

          <h4><li>Things to Do:</li></h4>
      
          {/* <h4>Overview:</h4> */}
          <p>Welcome to the scenic coastal town of Bodega Bay, California! This picturesque town offers a perfect weekend getaway with stunning ocean views, serene landscapes, and a charming coastal vibe. Explore the natural beauty, indulge in fresh seafood, and discover local wines that make Bodega Bay an ideal retreat. Pack your bags and get ready for a memorable weekend of celebrating in October!</p>
          
          <Drawer
            headerText="Coastal Exploration:"
          >
            <p><strong>Local Recommendation:</strong> Head to Goat Rock Beach for an off-the-beaten-path coastal adventure. Marvel at the enormous rock formations and keep an eye out for playful harbor seals.</p>
            <p><strong>Hidden Gem:</strong> Bodega Dunes Beach Trail is a lesser-known hiking trail that winds through the dunes and leads to the shoreline. Enjoy the serene walk amidst coastal flora and wildlife.</p>
          </Drawer>

          <Drawer
            headerText="Outdoor Adventures:"
          >
            <p><strong>Local Recommendation:</strong> Take a guided horseback-riding tour to explore the scenic hills of Northern California at the pinnacle of harvest.</p>
            <p><strong>Hidden Gem:</strong> Pomo Canyon Trail is a lesser-explored trail, boasting picturesque coastal views and a beautiful forested section. Keep an eye out for deer and other wildlife.</p>
          </Drawer>
          
          <Drawer
            headerText="Local Charm:"
          >
            <p><strong>Local Recommendation:</strong> Visit The Birds Cafe, a local outdoor cafe that shares a name with the famous Hitchcock film. The cafe offers stunning bay views alongside coffee and ice cream as well as oysters and beer. There is also a cute gift shop for any local souvenirs.</p>
            <p><strong>Hidden Gem:</strong> Potter Schoolhouse is a must-visit for Hitchcock fans. While it doesn’t offer tours, visitors can take pictures from several angles and imagine the terrifying scene where screaming children ran from the schoolhouse down into the town while being attacked by angry crows. Also nearby, you can find Diekmann's Bay Store. This historic country store offers unique gifts and nostalgic charm.</p>
          </Drawer>

          <Drawer
            headerText="Wine Tasting:"
          >
            <p><strong>Local Recommendation:</strong> Plan a visit Sonoma Coast Vineyards for a wine tasting experience surrounded by rugged coastal landscape. Sip on elegant cool-climate wines.</p>
            <p><strong>Hidden Gem:</strong> Take the day to visit Halleck Vineyard or Freeman Winery. Both are boutique wineries known for exceptional Pinot Noir and Chardonnay. Enjoy intimate tastings and stunning vineyard views. Both wineries require a reservation.</p>
          </Drawer>
          
          <h4>Tip:</h4>
          <ul>
            <li>October is harvest season! Take in the rich color and energy before the cool weather hits. Wineries may be busier than usual because of this.</li>
            <li>Many winery tours/tasting rooms require a reservation. Be sure to call ahead to see if they are available.</li>
          </ul>

          <h4>Travel Tips:</h4>
          <ul>
            <li>Dress in layers as October weather can be variable. The sun is hot and the sea breeze is cold. Bring a light jacket for cool evenings.</li>
            <li>Lyfts/Ubers can be hard to come by if available at all. Please plan for extra time if hailing a carshare.</li>
            <li>Signal can be spotty in the valley. Save all your directions before venturing out to a vineyard or hike.</li>
          </ul>
        </ol>
      </div>
    </div>
  )
}

export default PlanAheadOverlay

