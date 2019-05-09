const HeaderUltilitiesItem = (props) => (
    <>
        <a href={props.item.url} className="ult-item-container">
            <i></i>
            <span className="item-name">
                {props.item.name}
            </span>
        </a>
        <style jsx>{`
            .ult-item-container{
                display: flex;
                padding: 5px 10px;
                white-space: nowrap;
                font-size: 14px;

                align-items: center;
            }

            .item-name{
                margin-left: 0.5rem;
            }
        `}</style>
    </>
);

export default HeaderUltilitiesItem;