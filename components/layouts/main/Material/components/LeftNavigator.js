import ResizeButton from './ResizeButton';
import { useState } from 'react';

const LeftNavigator = (props) => {
    const [resizeStatus, setResizeStatus] = useState("expanded");
    function toggleResize(){
        if(resizeStatus === "expanded") {
            setResizeStatus("collapsed");
        } else {
            setResizeStatus("expanded");
        }
    }

    return <>
        <div className="left-navigator-container-1">
            <div className="left-navigator-container-2">
                <ResizeButton toggleResize={toggleResize} resizeStatus={resizeStatus} />
            </div>
        </div>
        <style jsx>{`
            .left-navigator-container-1 {
                display: flex;

                position: fixed;
                top: 0;
                bottom: 0;
                width: ${resizeStatus === "collapsed" ? "50px" : "200px"};
                padding-top: 50px;
            
                transition: width 0.3s;
            }

            .left-navigator-container-2 {
                display: flex;
                flex: 1;

                position: relative;

                border-right: 2px solid #ffa000;               
            }
        `}</style>
    </>
};

export default LeftNavigator;