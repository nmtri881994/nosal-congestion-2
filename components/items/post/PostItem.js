import { useState } from "react";

const PostItem = (props) => {
    const [post, setPost] = useState(null);

    return (
        <>
            {console.log(props)}
            <div className="post-item-container-1">
                <div className="post-item-container-2">
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
                                    0
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .post-item-container-1{
                    display: flex;

                    width: 285px;
                    height: 150px;
                    margin-top: 20px;
                    border-radius: 5px;

                    background-color: white;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    margin-right: 20px;

                    background: url(${props.post ? props.post.detail.image.dataUrl : ""});
                    background-position: center top;
                    background-size: auto auto;

                    background-size:     cover;                
                    background-repeat:   no-repeat;
                    background-position: center center; 

                    overflow: hidden;
                }

                .post-item-container-1:not(:last-of-type) {
                    // margin-right: 20px;
                }

                .post-item-container-2 {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .post-info-container-1{
                    display: flex;
                    flex-direction: row;
                    color: white;
                    padding: 10px 20px;

                    max-height: 50px;

                    background-color: rgb(33, 150, 243, 0.6);
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

                    background-color: #f2f2f3;
                    color: black;
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