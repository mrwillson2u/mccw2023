import React, {useEffect, useState} from "react"
import './RSVPOverlay.sass'
import OverlayHeader from "../OverlayHeader"
import Airtable from 'airtable';
import StepTracker from "../StepTracker";


const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app8UIts4WPB9nbUP');
// Airtable.configure({
//   endpointUrl: 'https://api.airtable.com',
//   apiKey: process.env.AIRTABLE_API_KEY
// });

const searchForName = (guestName, callback) => {
  let retrievedNames = [];
  base('Guest List').select({
    filterByFormula: `FIND('${guestName}', {Name})`
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function(record) {
          console.log('Retrieved', record.get('Guest Group'));
      });
      retrievedNames = [...retrievedNames, ...records]
      // setRsvpValues({...rsvpValues, foundNames: [...rsvpValues.foundNames, records]})
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      
      fetchNextPage();

  }, function done(err) {
      if (err) {
        console.error(err); 
        return;
      }
      callback(retrievedNames);
  });

}

const getGestsGroup = (recId, callback) => {
  base('Guest List').find(recId, function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.get('Guest Group'));
    const groupID = record.get('Guest Group')[0];
    if(groupID) {
      base('Guest Groups').find(groupID, function(err, record) {
        if (err) { console.error(err); return; }

        if(record) {
          console.log('Retrieved Group', record.get('Guest/s'));
          const guestIDs = record.get('Guest/s');

          let filterString = "OR(";
          let firstID = true;
          for(let guestID of guestIDs) {
            if(!firstID) {
              filterString += ','
            }
            firstID = false;
            console.log('guestID', guestID);
            filterString += `RECORD_ID() = '${guestID}'`;
          }
          filterString += ')';
          
          let guestInGroupRecs = [];
          // console.log('filterString', filterString);

          base('Guest List').select({
            filterByFormula: filterString
            // sort: [{field: "Name", direction: "desc"}]
          }).eachPage(function page(records, fetchNextPage) {
            guestInGroupRecs = [...guestInGroupRecs, ...records];
            fetchNextPage();

          }, function done(err) {
              if (err) {
                console.error(err); 
                return;
              }
              console.log('guestInGroupRecs', guestInGroupRecs);
              callback(guestInGroupRecs);
          });
        }
      });
    }
    
  });
}

const RSVPOverlay = (props) => {
  const [rsvpStep, setRsvpStep] = useState(1);
  const [rsvpValues, setRsvpValues] = useState(
    {
      searchValue: '',
      retrievedNames: [],
      guestsInGroupRecs: [],
      guestData: [],
      guestGroupID: '',
      isDriving: false,
      musicRequests: '',
      notes: '',
      needAccomidations: false,
      emails: ['']
    }
  );

  const [guestsInGroupRecs, setGuestsInGroupRecs] = useState([]);

  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('submitting', rsvpValues.searchValue);
    searchForName(rsvpValues.searchValue, (results) => {
      setRsvpValues({...rsvpValues, retrievedNames: results})
      console.log(`search complete! Found ${results.length} results.`);
      setRsvpStep(2);

    });
    
  }

  const handleGuestNameSubmit = (guestID) => {
    // console.log('Picked ', guestID);
    getGestsGroup(guestID, (guestRecords) => {
      // setRsvpValues({...rsvpValues, guestsInGroupRecs: guestRecords});
      const initialGuestData = [];
      guestRecords.forEach((guestRec) => {
        initialGuestData.push({
          id: guestRec.id,
          record: guestRec,
          guest_name: guestRec.get('Name'),
          email: '',
          attending: false,
          dietary_restrictions: ""
        });
      })
      setRsvpValues({
        ...rsvpValues, 
        guestGroupID: guestRecords[0].get('Guest Group')[0],
        guestData: initialGuestData
      });
      setRsvpStep(3);
    })
  }


  const handleGuestDataChange = (event, index) => { 
    const { name, value } = event.target; 
    const tempData = rsvpValues;
    tempData.guestData[index][name] = value;
    setRsvpValues({...tempData})
  }

  const handleEmailChange = (event, index) => {
    const { value } = event.target; 
    const tempData = rsvpValues;
    tempData.emails[index] = value;
    setRsvpValues({...tempData})
  }

  const handleGroupDataChange = (event) => { 
    const { name, value } = event.target; 
    const tempData = rsvpValues;
    tempData[name] = value;
    console.log('tempData(group)', tempData);
    setRsvpValues({...tempData})
  }

  const handleCheckbox = (event, index) => {
    const { name, checked } = event.target; 
    const tempData = rsvpValues;
    tempData.guestData[index][name] = checked;
    setRsvpValues({...tempData})
  }

  const handleNameChange = (event) => { 
    const { name, value} = event.target; 
    setRsvpValues({...rsvpValues, searchValue: value})
}

  const advanceToStep = (event, step) => {
    event.preventDefault();
    setRsvpStep(step);
  }

  const handleComplete = () => {
    props.closeOverlay()
    props.resetForm();
  }

  const handleSubmitRsvpData = () => {
    const guestUpdates = rsvpValues.guestData.map((guest) => {

      return({
        "id": guest.id,
        "fields": {
          "fld6x7Zs3SbmWrmHe": guest.dietary_restrictions,
          "fld2Q9UHzqViMrwY9": (guest.attending ? "Yes": "No"),
        }
      })
    })



    console.log('guestUpdates', guestUpdates);
    base('Guest List').update(
      guestUpdates, 
      function(err, records) {
      if (err) {
        console.error(err);
        return;
      }

      const emailData = rsvpValues.emails.map((email, index) => {
        return{
          "fields": {
            "fldkAAbUOkoas2zuO": email
          }
        }
      })

      // Push Email data
      base('tbl1ZxMehJRSk6UtV').create(
        emailData, 
        function(err, records) {
          if (err) {
            console.error(err);
            return;
          }
          
          const rsvpData = records.map((rec) => {
            return({
              "fields": {
                "fldRujPuZaGRIkgSM": [rsvpValues.guestGroupID],
                "fldiY1JaSif34U5jP": (rsvpValues.isDriving ? 'selx0wgk67nSpew1l' : 'selnb8lYYgn165xia'),
                "fldNVy7aoAYVbPuq3": rsvpValues.notes,
                "fldoC00IZvmsPqvlF": (rsvpValues.needAccomidations ? 'seldihGOXKuZZyCsY' : 'sel0uendvi2DRp1au'),
                "fldhZXXxmQWYYVfUM": rec.id,
                'fldEHPkkgyOntKw5P': JSON.stringify(rsvpValues)
              }
            })
          });

              // Push RSVP data
          base('tblwkLuPKSMYwjKkJ').create(
            rsvpData, 
            function(err, records) {
              if (err) {
                console.error(err);
                return;
              }

              console.log('RSVP successfully sent!');
              
            }
          );
        }
      );
    });
  }


  const renderStep = (step) => {
    let output;
    switch(step) {
      case 1: // Search for record
        output = (
          <form>
            <p className="rsvpInstructions">
              To look up your invite, please enter the first and last name of an invitee as it appears on the envelope.
            </p>
            <label>
              Name:
              <input type="text" name="searchValue" value={rsvpValues.searchValue} onChange={handleNameChange} />
              <input type="button" value="Search" onClick={handleSearchSubmit}/>
            </label>
            
          </form>
        );
        break;
      case 2: // Confirm Record
        output = (
          <form>
            <p className="rsvpInstructions">
              Please confirm this is your correct name below.
            </p>
            {
              rsvpValues.retrievedNames.map((result, index) => {
                const recordName = result.get('Name');
                return (
                  <>
                    <input className="nameButton" type="button" id={recordName} value={recordName} onClick={() => { handleGuestNameSubmit(result.id) } }/>
                    {/* <label for={recordName}>{recordName}</label> */}
                  </>
                )
              })
            }
          </form>
        );
        break;

      case 3: // Confirm Attendance
            console.log('rsvpValues>', rsvpValues);
        output = (
          <form>
            <p className="rsvpInstructions">
              Great, we have your invitation info here. Can you indicate whether the guest/guests are attending? If necessary, please edit the names as they should appear om the seating card.
              {/* Please add an email for one or more guests so that we can send updates and info as the big day gets closer! */}
            </p>
            {
              rsvpValues.guestData.map((guestData, index) => {
                const guestRec = guestData.record;
                console.log('guesstRec', guestRec.get('Name'));
                const guestName = guestRec.get('Name');
                return (
                  <>
                    <div>
                      <input type="checkbox" name="attending" id={guestRec.id} checked={rsvpValues.guestData[index].attending} onChange={(e) => handleCheckbox(e, index)}/>
                      <input type="text" name='guest_name' value={rsvpValues.guestData[index].guest_name} id='gname' onChange={(e) => handleGuestDataChange(e, index)} readOnly={true} />
                      {/* <h4>{rsvpValues.guestData[index].guest_name}</h4> */}
                      </div>
                    {/* {rsvpValues.guestData[index].attending && 
                      <>
                        <div>
                          <label for='email'>email </label>
                          <input type="text" name='email' value={rsvpValues.guestData[index].email} id='gname' onChange={(e) => handleGuestDataChange(e, index)}/>
                        </div>
                        <div>
                          <label for='drestrict'>Dietary restrictions:</label>
                          <input type="text" name='dietary_restrictions' value={rsvpValues.guestData[index].dietary_restrictions} id='drestrict' onChange={(e) => handleGuestDataChange(e, index)} />
                        </div>
                        
                      </>
                     */}
                    

                  </>
                )
              })
             
            }
            <input type="button" value="Continue" onClick={(e) => advanceToStep(e, 4)}/>
          </form>
        );
        break;

        case 4: // Dietary Restrictions
        console.log('rsvpValues>', rsvpValues);
        output = (
          <form>
            <p className="rsvpInstructions">
              In order to plan ahead, please let us know if guests have dietery restrictions we should know about.
            </p>
            {
              rsvpValues.guestData.map((guestData, index) => {
                const guestRec = guestData.record;
                console.log('guesstRec', guestRec.get('Name'));
                const guestName = guestRec.get('Name');
                if(guestData.attending) {
                  return (
                    <>
                      <div>
                        {/* <input type="text" name='guest_name' value={rsvpValues.guestData[index].guest_name} id='gname' onChange={(e) => handleGuestDataChange(e, index)} readOnly={true} /> */}
                        <h4>{rsvpValues.guestData[index].guest_name}</h4>
                        </div>
                        <label for='drestrict'>Dietary restrictions:</label>
                        <input type="text" name='dietary_restrictions' value={rsvpValues.guestData[index].dietary_restrictions} id='drestrict' onChange={(e) => handleGuestDataChange(e, index)} />
                    </>
                  )
                }
              })
            
            }
            <input type="button" value="Continue" onClick={(e) => advanceToStep(e, 5)}/>
          </form>
        );
        break;

      case 5: // Planning on driving
        console.log('step5');

        const handleTransSubmit = (result) => {
          setRsvpValues({...rsvpValues,isDriving: result});
          setRsvpStep(6);
        }

        output = (
          <form>
            <p className='rsvpInstructions'>
              The venue and surrounding area do not have public transportation and there are not a lot of available ride sharing options. 
              We recommend either driving, carpooling, or pre-arranging shared transportation to the area. Please let us know if you plan to rent/drive or whether you need help arranging tranportation. If you do plan on driving, let us know if youd be willing to bring carpoolers.
            </p>
            <div className='transButtonContainer'>
              <button
                onClick={() => {
                  handleTransSubmit(true);
                }}
              >
                Have a ride
              </button>
              <button
                onClick={() => {
                  handleTransSubmit(false);
                }}
              >
                Need a ride
              </button>
            </div>
          </form>
        );
        break;
      case 6: // Accomidations
        console.log('step6');

        output = (
          <form>
            <p className="rsvpInstructions">
              Are there any messages or questions you'd like to to share along with your RSVP?
            </p>
            
            <textarea name="notes" rows="10" cols="30" value={rsvpValues.notes} onChange={handleGroupDataChange} />
              
            <input type="button" value="Continue" onClick={(e) => advanceToStep(e, 8)}/>
          </form>
        );
        break;

      // case 7: // Music Requests
      //   console.log('step7');
      //   output = (
      //     <form>
      //       <p className="rsvpInstructions">
      //         Is there any music you'd like to hear at the recepton? We cant guarantee that we will be able to include everybodys request, but we'll do our best!
      //       </p>
            
      //         <textarea name="musicRequests" rows="10" cols="30" value={rsvpValues.musicRequests} onChange={handleGroupDataChange} />
              
      //       <input type="button" value="Continue" onClick={(e) => advanceToStep(e, 8)}/>
      //     </form>
      //   );
      //   break;

      case 8: // Email
        // rsvpValues.emails.push('');
        output = (
          <form>
            <p className="rsvpInstructions">
              Please enter an email so that we can send you a confirmation, along with any updates or reminders as we get closer to the big day!
            </p>
            <label for='email'>Email </label>
            {rsvpValues.emails.map((email, index) => {
              const lastEmail = (index + 1 === rsvpValues.emails.length) ? true : false;
              
              return(
                <div className="emailContainer">
                  <input className='emailInput' type="text" name='email' value={email} id='gname' onChange={(e) => handleEmailChange(e, index)}/>
                    {(rsvpValues.emails.length > 1) && <input type="button" value="-" onClick={() => {
                        let updatedEmails = rsvpValues.emails;
                        updatedEmails.splice(index, 1);
                        setRsvpValues({...rsvpValues, emails: updatedEmails});
                      }}
                    />}
                </div>
              )
              
            })}
            <input type="button" value="Add an email" onClick={() => setRsvpValues({...rsvpValues, emails: [...rsvpValues.emails, '']})}/>
            <input className="emailContinueButton" type="button" value="Complete" onClick={(e) => { handleSubmitRsvpData(); advanceToStep(e, 9) }}/>
          </form>
        );
        break;

      case 9: // Confirmation
        console.log('step9');
        
        const description = (
          <p className="rsvpInstructions">
            Here are your RSVP details! Make sure to click the buttom below to make sure the info is submitted.
          </p>
        );
        
        const attendingCount = 0;

        for(let guest in rsvpValues.guestData) {
          if(guest.attending) {
            attendingCount++;
          }
        }

        

        output = (
          <>
            <p className="rsvpInstructions">
              The RSVP is recieved. We are looking forward to seeing you there!
            </p>
            {/* <h3>Guests Attending:</h3>
            {rsvpValues.guestData.map((guest) => {

                if(guest.attending) {
                  return (
                    <>
                      <h4>{guest.guest_name}</h4>
                      
                      <p><b>Email:</b> {guest.email ? guest.email : 'Not provided'}</p>
                      <p><b>Dietary Restrictions:</b> {guest.dietary_restrictions ? guest.dietary_restrictions : 'None'}</p>
                    </>
                  )
                }
                else {
                  return (
                    <>
                      <h4>{guest.guest_name}</h4> 
                      <p>Not Attending</p>
                    </>
                  )
                }
              })
            } */}
            <button className="rsvpCloseButton" onClick={handleComplete}>Close</button>
          </>
        );
        break;

      
    }

    return output;
  }
  return (
    <>
      <OverlayHeader>
        <h2>RSVP</h2>
      </OverlayHeader>
      <div className="formContainer">
        {renderStep(rsvpStep)}
      </div>
      <StepTracker 
        stepCount={8}
        activeStep={rsvpStep}
        setActiveStep={setRsvpStep}
      />
      
    </>
  )
}

export default RSVPOverlay

