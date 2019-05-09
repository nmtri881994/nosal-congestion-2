import HeaderUltilitiesItem from './HeaderUltilitesItem';

const HeaderUltilities = (props) => (
    <>
        <div className="ultilities-container">
            {props.items.map(item => <HeaderUltilitiesItem key={item.id} item={item} />)}
        </div>
        <style jsx>{`
            .ultilities-container{
                display: flex;
                width: auto;
                align-tiems: center;
                justify-content: flex-end;
            }
        `}</style>
    </>
);

export default HeaderUltilities;