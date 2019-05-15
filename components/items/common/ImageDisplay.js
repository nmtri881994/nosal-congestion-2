import { useState, useEffect } from "react";
// import uniqid from 'uniqid';

const ImageDisplay = (props) => {
    const [image, setImage] = useState(props.image);

    useEffect(() => {
        const imageContainers = [...document.getElementsByClassName('image-container-2')];
        const correctContainer = imageContainers.find(container => container.getAttribute("data-id") === image.id.toString());
        correctContainer.style["padding-bottom"] = `${100 * image.height / image.width}%`;
    }, [image]);

    return (
        <>
            <div className="image-container-1">
                <div className="image-container-2" data-id={image.id}></div>
            </div>
            <style jsx>{`
                .image-container-1 {
                    position: relative;
                    width: 100%;

                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }
                
                .image-container-2 {
                    background-image: url("${image ? image.dataUrl : null}");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
            `}</style>
        </>
    )
};

export default ImageDisplay;