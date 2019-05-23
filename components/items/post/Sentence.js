import { useState, useRef, useEffect } from "react";

import TranslateTool from './TranslateTool';
// import TranslateTool2 from './TranslateTool2';


const Sentence = (props) => {

    const [showTranslateTool, setShowTranslateTool] = useState(false);

    useEffect(() => {
        if (props.currentLanguage !== props.originalLanguage) {
            setShowTranslateTool(props.translatingSentence === props.sentence.id);
        }
    })

    return (
        <>
            <span onClick={() => {
                if (props.sentence.text[props.currentLanguage]) {
                    props.startTranslateSentence(props.sentence.id);
                }
            }} className={`sentence-container ${props.currentLanguage !== props.originalLanguage ?
                `${props.sentence.text[props.currentLanguage] && props.sentence.text[props.currentLanguage].text ?
                    `parsed-text-sentence translated ${props.translatingSentence === props.sentence.id ?
                        "translated-selected" : ""}` : ""}` : ""}`} >
                {showTranslateTool ?
                    <TranslateTool originalText={props.sentence.text[props.originalLanguage].text} />
                    : null}
                {props.sentence.text[props.currentLanguage] && props.sentence.text[props.currentLanguage].text ? props.sentence.text[props.currentLanguage].text : props.sentence.text[props.originalLanguage].text}
            </span>
            <style jsx>{`
                .sentence-container{
                    position: relative;
                    word-break: break-word;
                }

                .parsed-text-sentence {
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .original {
                    background-color: #e3f2fd;
                }

                .original:hover {
                    background-color: #bbdefb;
                }

                .original-selected {
                    background-color: #bbdefb;
                }

                .translated {
                    background-color: #e8f5e9;
                }

                .translated:hover {
                    background-color: #c8e6c9;
                }

                .translated-selected {
                    background-color: #c8e6c9;
                }
            `}</style>
        </>
    )
}

export default Sentence;