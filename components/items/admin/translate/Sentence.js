import { useState, useRef, useEffect } from "react";

import TranslateTool from './TranslateTool';
// import TranslateTool2 from './TranslateTool2';

import AddPostItem from './AddPostItem';

const Sentence = (props) => {

    const [showTranslateTool, setShowTranslateTool] = useState(false);

    useEffect(() => {
        if (props.currentLanguage !== props.originalLanguage) {
            setShowTranslateTool(props.translatingSentence === props.sentence.id);
        }
    })

    return (
        <>
            <span onClick={() => props.startTranslateSentence(props.sentence.id)} className={`sentence-container ${props.currentLanguage !== props.originalLanguage ? `parsed-text-sentence ${props.sentence.text[props.currentLanguage] ? `translated ${props.translatingSentence === props.sentence.id ? "translated-selected" : null}` : `original ${props.translatingSentence === props.sentence.id ? "original-selected" : null}`}` : null}`} >
                {showTranslateTool ?
                    <TranslateTool contentItemID={props.contentItemID} type={props.type} onTranslate={props.onTranslate} currentLanguage={props.currentLanguage} originalLanguage={props.originalLanguage} sentence={props.sentence} />
                    : null}
                {props.sentence.text[props.currentLanguage] ? props.sentence.text[props.currentLanguage] : props.sentence.text[props.originalLanguage]}
            </span>
            <style jsx>{`
                .sentence-container{
                    position: relative;
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