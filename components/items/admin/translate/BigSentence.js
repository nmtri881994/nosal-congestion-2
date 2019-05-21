import { useState, useEffect } from "react";
import TranslateTool from './TranslateTool';

const BigSentence = (props) => {

    const [showTranslateTool, setShowTranslateTool] = useState(false);

    useEffect(() => {
        console.log(111);
        if (props.currentLanguage !== props.originalLanguage) {
            setShowTranslateTool(props.translatingSentence === props.sentences[0].id);
        }
    });

    return (
        <>
            {console.log("sentences", props.sentences)}
            <span onClick={() => props.startTranslateSentence(props.sentences[0].id)}
                className={`sentence-container ${props.currentLanguage !== props.originalLanguage ? `parsed-text-sentence ${props.sentences[0].text[props.currentLanguage] && props.sentences[0].text[props.currentLanguage].text ?
                    `translated ${props.translatingSentence === props.sentences[0].id ?
                        "translated-selected" : null}` : `original ${props.translatingSentence === props.sentences[0].id ? "original-selected" : null}`}` : null}`}>
                {showTranslateTool ?
                    <TranslateTool contentItemID={props.contentItemID} type={props.type} onTranslate={props.onTranslate} currentLanguage={props.currentLanguage}
                        originalLanguage={props.originalLanguage}
                        originalText={props.sentences.map(sentence => sentence.text[props.originalLanguage].text)}
                        translatedText={props.sentences[0].text[props.currentLanguage] && props.sentences[0].text[props.currentLanguage].text ? props.sentences[0].text[props.currentLanguage].text : ""}
                        sentenceID={props.sentences[0].id} />
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