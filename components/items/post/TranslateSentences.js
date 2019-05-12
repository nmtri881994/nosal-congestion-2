import Sentence from './Sentence';

const TranslateSentences = (props) => {
    return (
        <>
            {props.parsedText.map(textItem => <Sentence type={props.type} onTranslate={props.onTranslate} startTranslateSentence={props.startTranslateSentence} translatingSentence={props.translatingSentence} contentItemID={props.contentItemID} key={textItem.id} originalLanguage={props.originalLanguage} currentLanguage={props.currentLanguage} sentence={textItem} />)}
            <style jsx>{`

            `}</style>
        </>
    )
}

export default TranslateSentences;