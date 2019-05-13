import { useState } from "react";

const PostItem = (props) => {
    const [post, setPost] = useState(null);

    return (
        <>
            <div className="post-item-container-1 noselect cursor-pointer">
                <div className="post-item-container-2">
                    <div className="post-item-container-3">
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
                </div>
            </div>
            <style jsx>{`
                .post-item-container-1{
                    display: flex;

                    width: 284px;
                    height: 142px;
                    margin-top: 20px;
                    margin-right: 20px;      
                }

                

                .post-item-container-1:not(:last-of-type) {
                    // margin-right: 20px;
                }

                .post-item-container-2 {
                    display: flex;
                    flex: 1;

                    overflow: hidden;
                    border-radius: 5px;

                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                   
                    transition: margin 0.1s;
                }

                .post-item-container-2:hover {
                    margin: -5px -10px;
                }

                .post-item-container-3{
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: flex-end;

                    background: url(${props.post ? props.post.detail.image.dataUrl : ""});
                    background-position: center;
                    background-size:     cover;                
                    background-repeat:   no-repeat;

                }
                
                .post-info-container-1{
                    display: flex;
                    flex-direction: row;
                    color: white;
                    padding: 10px 20px;

                    max-height: 50px;

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

                @media (max-width: 640px) {
                    .post-item-container-1 {
                        width: 240px;
                        height: 120px;
                    }
                }

                @media (max-width: 540px) {
                    .post-item-container-1 {
                        width: 100%;
                        min-width: 350px;

                        overflow: hidden;

                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

                        margin-top: 10px;
                        height: 150px;
                    }

                    .post-item-container-2 {
                        border-radius: 0;
                    }

                }
            `}</style>
        </>
    )
};

export default PostItem;