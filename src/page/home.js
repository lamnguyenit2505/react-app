import React, { Component, useState  } from "react";
import Header from "../components/layouts/header";
import HomeContent from "../components/content/HomeContent";
 
const HomeComponent = () => {
  return(
    <div>
        <Header></Header>
        <HomeContent></HomeContent>
    </div>
  )
}

export default HomeComponent