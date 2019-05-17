const PostItem = (props) => {
    return (
        <>
            <div className="post-container-1">
                <div className="post-info-container-1">
                    <div className="name-container-1">
                        <div className="name">
                            {props.post.detail.nameByLang}
                        </div>

                    </div>
                    <div className="view-container-1 noselect">
                        <div className="view-container-2">
                            <div className="view-icon">
                                <i className="fas fa-eye"></i>
                            </div>
                            <div className="number-of-views">
                                {props.post.numberOfViews}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .post-container-1 {
                    width: 100%;
                    height: 100%;

                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;


                    background: url(${props.post ? `${props.post.detail.image.dataUrl}` : ""});
                    background-position: center;
                    background-size:     cover;                
                    background-repeat:   no-repeat;
                }

                .post-info-container-1{
                    display: flex;
                    flex-direction: row;
                    color: white;
                    padding: 10px 10px;


                    background-color: rgba(0,0,0,.6);;
                }

                .name-container-1{
                    display: flex;
                    flex: 1;
                }

                .name {
                    font-size: 18px;

                }

                .view-container-1{
                    display: flex;
                    flex-direction: column;

                    margin-left: 10px;
                }

                .view-container-2{
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    border-radius: 5px;
                    padding: 5px;

                    // background-color: #f2f2f3;
                    color: white;
                }

                .view-icon {
                    display: flex;
                }

                .number-of-views{
                    display: flex;

                    margin-left: 5px;
                }
            `}</style>
        </>
    )
};

export default PostItem;