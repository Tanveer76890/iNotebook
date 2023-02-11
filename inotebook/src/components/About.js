// import React, { useContext, useEffect } from "react";
// import noteContext from "../context/notes/noteContext";

const About = () => {
  // const context = useContext(noteContext);

  // useEffect(() => {
  //   context.updateFun();
  //  // eslint-disable-next-line
  // }, [])
  


  return (
    <>
      <div className="container fw-bolder text-center my-3">
        <h1>This is About page.</h1>
        <h2>My Name is {/*context.state.name*/} . and my age is : {/*context.state.age*/}.</h2>
      </div>
    </>
  );
};

export default About;
