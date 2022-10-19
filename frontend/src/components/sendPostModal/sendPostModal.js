import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {changeModalVisibility} from "../../redux/postModalSlice/postModalSlice";
import {useSelector} from "react-redux";
import send_svg from "../../assets/svgs/send_button.svg";
import {changeLastEditedPostText} from "../../redux/userSlice/userSlice";

function NewPostModal(props){
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const notShowingClasses = "modal"
    const showingClasses = "modal is-active"
    const showingStatus= useSelector((state)=>state.newPostModal.visible)
    const myAvatarUrl=useSelector((state)=>state.user.avatarURL)

    const changeModalStatus = () => {
        dispatch(changeModalVisibility())
    }

    return(
        <div className={showingStatus ? showingClasses : notShowingClasses}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head new_post_modal_header">
                    <button className="delete" aria-label="close" onClick={changeModalStatus}></button>
                </header>
                <section className="modal-card-body new_post_modal_body">
                    <figure className="image is-48x48">
                        <img className="avatar is-rounded" src={myAvatarUrl} alt="user avatar image"/>
                    </figure>

                    <input type="text" value={props.text} className="new_post_text_outside"/>

                </section>
                <footer className="modal-card-foot">
                    <div className="icons">
                        <div className="image-upload">
                            <label htmlFor="file-input">
                                <i className="fa-solid fa-image"></i>
                            </label>
                            <input type="file" id="file-input" className="new_post_image_upload" onChange={props.fileSelectionHandler}/>
                        </div>
                        <div className="share-link">
                            <i className="fa-solid fa-link"></i>
                        </div>

                    </div>

                    <img className="send_post_button" onClick={props.sendPostHandler} src={send_svg}/>
                </footer>
            </div>
        </div>
    )

}

export default NewPostModal