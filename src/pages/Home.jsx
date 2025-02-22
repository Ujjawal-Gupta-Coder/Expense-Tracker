import React, { useState } from "react";
import Heading from "../components/Heading";
import Form from "../components/Form";
import UserGuide from "../components/UserGuide";
import Joyride from 'react-joyride';
const Home = () => {
  const [runTour, setRunTour] = useState(localStorage.getItem("homePageTourCompleted") !== "true");
  const steps = [
    {
      target: '.step-1',
      content: "Welcome to Expense Tracker! Easily track, analyze, and manage your expenses. Let's take a quick tour!",
      disableBeacon : true
    },
    {
      target: '.step-2',
      content: 'Fill the "Add Expense" form to record a new expense. Enter details like category, amount, payment mode, and date. Then, click the "Add" button to save it.',
      disableBeacon : true
    },
    {
      target: '.step-last',
      content: "Click here to start the home page tour anytime and explore the app's features!",
      disableBeacon : true
    },
  ];
  
  return (
      <div className="bg-slate-800 w-full min-h-screen--70px h-fit text-white px-8 pb-5 flex flex-col items-center gap-6">
        <UserGuide text={"Guide For Home Page"} setRunTour={setRunTour} />
        <Heading headline={'Keep Track of Your Expenses'}/>
        <Form maxDiscriptionLimit={100}/>

        <div className="absolute">
          <Joyride steps = {steps} 
          run = {runTour}
          callback={({status}) => {
            if(status === "finished" || status === "skipped") {
              localStorage.setItem("homePageTourCompleted", "true");
              setRunTour(false);
            }
          }}
          continuous showSkipButton showProgress disableScrolling disableOverlayClose
          locale={{
            last: 'Finish',
            next: 'Next',
            skip: 'Skip',
          }} 
          
          styles={{
            options: {
              primaryColor: 'green',
              textColor: "white",
              backgroundColor: '#465878',
              arrowColor:"yellow"
            },
            buttonNext: {
              border: "1px solid white",
              borderRadius: "15px"
            },
            buttonBack: {
              color: "white"
            },
          }}/>
        </div>

      </div>
  );
};

export default Home;
