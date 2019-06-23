const ResizeButton = (props) => {

    return <>
        <div className="container-1">
            <div className="container-2" onClick={() => props.toggleResize()}>
                {props.resizeStatus === "collapsed" ? ">" : "<"}
            </div>
        </div>
        <style jsx>{`
            .container-1 {
                display: flex;
                position: absolute;

                top: 50px;
                right: -17px;
            }

            .container-2 {
                display: flex;
                justify-content: center;
                align-items: center;

                border-radius: 100%;
                border: 2px solid #ffa000;
                
                width: 30px;
                height: 30px;

                background-color: white;

                cursor: pointer;
            }

        `}</style>
    </>
};

export default ResizeButton;