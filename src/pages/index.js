import React from "react"
import AppNoodle from "./AppNoddle"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { ScrollSection } from "../components/scroll-section";
import { Suspense } from 'react'
import Background from "../components/background";

const Index = () => {
    const { height, width } = useWindowDimensions();

    return(
        <>
            <Suspense fallback={null}>
                <div style={{height: height, width: width}}> 
                    <AppNoodle />
                    <Overlay />
                </div>
                {/* <div style={{height: 1000, width: width}}> 
                    <ScrollSection />
                </div> */}
            </Suspense>
        </>
    )
}

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      {/* <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        pmnd.rs
        <br />
        dev collective
      </a> */}
      <div style={{ position: 'absolute', top: 40, right: 40, fontSize: '13px' }}>About</div> 
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>_</div>
    </div>
  )
}

export default Index
