import Sentence from './Sentence';
import BigSentence from './BigSentence';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const TranslateSentences = (props) => {
    const [sentences, setSentences] = useState([]);

    useEffect(() => {
        const parsedText = props.parsedText.slice(0);
        const newSentences = [];
        for (let i = 0; i < parsedText.length; i++) {
            newSentences.push([parsedText[i]]);
            for (let j = i + 1; j < parsedText.length; j++) {
                if (parsedText[j].text[props.currentLanguage] && parsedText[j].text[props.currentLanguage].linked) {
                    newSentences[newSentences.length - 1].push(parsedText[j]);
                    i++;
                } else {
                    break;
                }
            }
        }
        if (!_.isEqual(sentences, newSentences)) {
            setSentences(newSentences);
        }
    })

    return (
        <>
            {/* {console.log(3, sentences)} */}
            {sentences.map((sentenceArray, index) => {
                if (sentenceArray.length == 1) {
                    return <Sentence startTranslateSentence={props.startTranslateSentence} translatingSentence={props.translatingSentence}
                        key={sentenceArray[0].id} originalLanguage={props.originalLanguage} currentLanguage={props.currentLanguage}
                        sentence={sentenceArray[0]} />;
                } else {
                    return <BigSentence startTranslateSentence={props.startTranslateSentence} translatingSentence={props.translatingSentence}
                        key={sentenceArray[0].id} sentences={sentenceArray} originalLanguage={props.originalLanguage}
                        currentLanguage={props.currentLanguage} />
                }
            })}
            <style jsx>{`
                
            `}</style>
        </>
    )
}

export default TranslateSentences;