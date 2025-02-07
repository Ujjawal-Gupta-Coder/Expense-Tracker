import React from "react";
import Heading from "../components/Heading";
import Form from "../components/Form";
import UserGuide from "../components/UserGuide";
const Home = () => {
  return (
      <div className="bg-slate-800 w-full min-h-screen--70px h-fit text-white px-8 pb-5 flex flex-col items-center gap-6">
        <UserGuide />
        <Heading headline={'Keep Track of Your Expenses'}/>
        <Form maxDiscriptionLimit={100}/>
      </div>
  );
};

export default Home;
