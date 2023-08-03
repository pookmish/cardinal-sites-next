"use client"

import Script from "next/script";
import {useEffect, useState} from "react";

const Editori11y = () => {
  const [addTool, setAddTool] = useState(false)

  useEffect(() => {
    if (document.cookie.indexOf('addEditoria11y') != -1) setAddTool(true)
  }, []);

  const startEditoria11y = () => {
    // @ts-ignore
    if (typeof Ed11y != 'undefined') {
      // @ts-ignore
      new Ed11y({
        checkRoots: '#main-content'
      });
    }
  }

  if (addTool) {
    return (
      <Script src="//cdn.jsdelivr.net/gh/itmaybejj/editoria11y@2/dist/editoria11y.min.js" onReady={startEditoria11y}/>
    )
  }
  return null;
}

export default Editori11y;