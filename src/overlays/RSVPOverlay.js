import * as React from "react"
import { useState } from "react"
import './RSVPOverlay.sass'
import OverlayHeader from "../OverlayHeader"
import Airtable from 'airtable';
import StepTracker from "../StepTracker";
import OverlaySpinner from "../OverlaySpinner"



const RSVPOverlay = (props) => {
  console.log('api key test', process.env.TEST);
  const base = new Airtable({apiKey: process.env.GATSBY_AIRTABLE_API_KEY}).base('app8UIts4WPB9nbUP');

  const searchForName = (guestName, callback) => {
    let retrievedNames = [];
    base('Guest List').select({
      filterByFormula: `FIND(LOWER('${guestName}'), LOWER({Name}))`,
      view: 'viw80DiHPXDf4Sxy6'
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
              filterByFormula: filterString,
              view: 'viw80DiHPXDf4Sxy6'
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
  const [rsvpStep, setRsvpStep] = useState(1);
  const [stepTrackerActive, setStepTrackerActive] = useState(true);
  const [emailValid, setEmailValid] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
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
      emails: [''],
      isAttending: false
    }
  );

  const [guestsInGroupRecs, setGuestsInGroupRecs] = useState([]);

  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('submitting', rsvpValues.searchValue);
    setSpinnerVisible(true)
    searchForName(rsvpValues.searchValue, (results) => {
      setRsvpValues({...rsvpValues, retrievedNames: results})
      console.log(`search complete! Found ${results.length} results.`);
      setSpinnerVisible(false);
      setRsvpStep(2);
      
    });
    
  }

  const handleGuestNameSubmit = (guestID) => {
    setSpinnerVisible(true);
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
      setSpinnerVisible(false);
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitRsvpData = () => {
    // Check that emails are valid
    let allEmailsValid = true;
    rsvpValues.emails.forEach((email, index) => {
      let tempArray = emailValid;
      
      if(validateEmail(email)) {
        tempArray[index] = 'valid';
        setEmailValid(tempArray);
      }
      else{
        tempArray[index] = 'invalid';
        setEmailValid(tempArray);
        allEmailsValid = false;
      }
    });

    // if(allEmailsValid) {
      setSpinnerVisible(true);
      pushRSVPToAirtable();
    // }

  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.key);
    if(e.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  const handleAttendanceCheck = (nextStep, notAttendingStep) => {
    let aGuestIsAttending = false;
    for(let guest of rsvpValues.guestData) {
      console.log('guestIsAttennding', guest.attending);
      if(guest.attending) {
        aGuestIsAttending = true;
        break;
      }
    }

    if(aGuestIsAttending) {
      setRsvpValues({...rsvpValues, isAttending: true});
      setRsvpStep(nextStep);
    }
    else {
      setRsvpValues({...rsvpValues, isAttending: false});
      setStepTrackerActive(false);
      setRsvpStep(notAttendingStep);
    }
  }

  const handleNotAttending = () =>{
    setSpinnerVisible(true);
    pushRSVPToAirtable();

  }

  const handleNotAttendingBack = () => {
    // console.log('handleNotAttendingBack', step);
    setStepTrackerActive(true);
    setRsvpStep(3);
  }

  const pushRSVPToAirtable = () => {
    

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
          
          const emailArray = records.map((rec) => rec.id );
          console.log('emailArray', emailArray);

              // Push RSVP data
          base('tblwkLuPKSMYwjKkJ').create([{
              "fields": {
                "fldRujPuZaGRIkgSM": [rsvpValues.guestGroupID],
                "fldiY1JaSif34U5jP": (rsvpValues.isDriving ? 'selx0wgk67nSpew1l' : 'selnb8lYYgn165xia'),
                "fldNVy7aoAYVbPuq3": rsvpValues.notes,
                "fldoC00IZvmsPqvlF": (rsvpValues.needAccomidations ? 'seldihGOXKuZZyCsY' : 'sel0uendvi2DRp1au'),
                "fldhZXXxmQWYYVfUM": emailArray,
                'fldEHPkkgyOntKw5P': JSON.stringify(rsvpValues)
              }
            }], 
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
    
    setSpinnerVisible(false);
    setRsvpStep(9);

  }


  const renderStep = (step) => {
    let output;
    switch(step) {
      case 1: // Search for record
        output = (
          <>          
            <form onSubmit={(e) => {
                // e.preventDefault();
                console.log(e.key);
                if(e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            >
              <p className="rsvpInstructions">
                To look up your invite, please enter enter your first name.
              </p>
              <label>
                Name:
                <input type="text" name="searchValue" value={rsvpValues.searchValue} onChange={handleNameChange} />
                <input type="submit" value="Search" onClick={handleSearchSubmit} />
              </label>
              
            </form>
            {/* {spinnerVisible && <SkewLoader color="#ff00ea" />} */}
          </>

        );
        break;
      case 2: // Confirm Record
        output = (
          <>
            <form onSubmit={handleFormSubmit}>
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
            {/* {spinnerVisible && <SkewLoader color="#ff00ea" />} */}
          </>
        );
        break;

      case 3: // Confirm Attendance
            console.log('rsvpValues>', rsvpValues);
        output = (
          <form onSubmit={handleFormSubmit}>
            <p className="rsvpInstructions">
              Great, we have your invitation info here. Please indicate whether the guest/guests are attending.
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
                  </>
                )
              })
             
            }
            <input className='submitButton' type="submit" value="Continue" onClick={(e) => handleAttendanceCheck(4, 10)}/>
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
      case 6: // Notes
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
                  <input className={`emailInput ${emailValid[index]}`} type="text" name='email' value={email} id='gname' onChange={(e) => handleEmailChange(e, index)}/>
                    {(rsvpValues.emails.length > 1) && <input type="button" value="-" onClick={() => {
                        let updatedEmails = rsvpValues.emails;
                        updatedEmails.splice(index, 1);
                        setRsvpValues({...rsvpValues, emails: updatedEmails});
                        let updatedEmailValid = emailValid;
                        updatedEmailValid.splice(index, 1);
                        setEmailValid(updatedEmailValid);
                      }}
                    />}
                </div>
              )
              
            })}
            <input type="button" value="Add an email" onClick={() => {
              setRsvpValues({...rsvpValues, emails: [...rsvpValues.emails, '']});
              setEmailValid([...emailValid, ''])
            }}
            />
            <input className="emailContinueButton" type="button" value="Complete" onClick={(e) => handleSubmitRsvpData()}/>
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
              The RSVP is recieved. {rsvpValues.isAttending ? `We are looking forward to seeing you there!` : `We're sorry to hear you can't make it.`} 
            </p>
            <button className="rsvpCloseButton" onClick={handleComplete}>Close</button>
          </>
        );
        break;

      case 10: // Sorry you cant join
        console.log('step10');

        output = (
          <>
            <p className="rsvpInstructions">
              It looks like all the guests in your party are marked as not attending. If this is true, we're sorry to hear that!
              Feel free to write an optional message, then please confirm by clicking the button below so we can plan accordingly.
            </p>

            <textarea className="notAttendingNote" name="notes" rows="10" cols="30" value={rsvpValues.notes} onChange={handleGroupDataChange} />
            <div className="notAttendingButtons">
              <button className="rsvpNotAttendingback" onClick={(handleNotAttendingBack)}>Back</button>
              <button className="rsvpNotAttendingConfirmation" onClick={handleNotAttending}>Confirm</button>
            </div>
            
          </>
        );
        break;
      case 10: // Sorry you cant join
        console.log('step10');

        output = (
          <>
            <p className="rsvpInstructions">
              It looks like all the guests in your party are marked as not attending. If this is true, we're sorry to hear that!
              Please confirm by clicking the button below so we can plan accordingly.
            </p>
            <button className="rsvpNotAttendingConfirmation" onClick={handleNotAttending}>Confirm</button>
          </>
        );
        break;
    }

    return output;
  }
  return (
    <>
      
      <OverlaySpinner 
        active={spinnerVisible}
      />
      <OverlayHeader>
      <h2>RSVP</h2>
      </OverlayHeader>
      <div className="formContainer">
        {renderStep(rsvpStep)}
      </div>
      {stepTrackerActive && <StepTracker 
        stepCount={8}
        activeStep={rsvpStep}
        setActiveStep={setRsvpStep}
      />}
      
    </>
  )
}

export default RSVPOverlay

