import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from '../util/axiosWithAuth'

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  
  const getColorList = () => {
    axiosWithAuth().get('/api/colors')
    .then(res => {
      setColorList(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getColorList()
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColorList={getColorList}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
