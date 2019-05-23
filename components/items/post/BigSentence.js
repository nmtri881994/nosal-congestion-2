import { useState, useEffect } from "react";
import TranslateTool from './TranslateTool';

const BigSentence = (props) => {

    const [showTranslateTool, setShowTranslateTool] = useState(false);

    useEffect(() => {
        if (props.currentLanguage !== props.originalLanguage) {
            setShowTranslateTool(props.translatingSentence === props.sentences[0].id);
        }
    });

    return (
        <>
            <span onClick={() => props.startTranslateSentence(props.sentences[0].id)}
                className={`sentence-container ${props.currentLanguage !== props.originalLanguage ?
                    `${props.sentences[0].text[props.currentLanguage] && props.sentences[0].text[props.currentLanguage].text ?
                        `parsed-text-sentence translated ${props.translatingSentence === props.sentences[0].id ?
                            "translated-selected" : ""}` : ""}` : ""}`}>
                {showTranslateTool ?
                    <TranslateTool
                        originalText={props.sentences.map(sentence => sentence.text[props.originalLanguage].text)}
                    />
                    : null}
                {props.sentences[0].text[props.currentLanguage] && props.sentences[0].text[props.currentLanguage].text ? props.sentences[0].text[props.currentLanguage].text :
                    props.sentences.map(sentence => sentence.text[props.originalLanguage].text)}
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
};

export default BigSentence;