import React, {useState, useRef, useEffect} from 'react'
import { connect } from 'react-redux'
import LoadingContainer from '../generic/loading'
import PinCommentContainer from '../comments/pin_comment_container'
import { fetchPin } from '../../actions/pin_actions'
import { fetchBoards } from '../../actions/board_actions'
import {closeDropdown} from '../dropdown/close_dropdown'
import { fetchUser } from '../../actions/user_actions'
import AddPinDropdown from './add_pin_dropdown'
import SavePinButton from '../buttons/save_button'
import UserPreviewContainer from '../users/user_preview'
import { abbreviate } from '../../util/function_util'
import { MAX_BOARD_CHAR } from '../../util/constants_util'

const PinShowContainer = (props) => {

    const {fetchBoards, fetchPin, fetchUser, currentUser, boards, users, pinId, pins} = props
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        fetchPin(pinId)
            .then((resp) => fetchUser(resp.pin.creator))
            .then(() => fetchBoards(currentUser.id))
            .finally(() => setLoading(false))
    }, [])

    const handleGoBack = (e) => {
        e.preventDefault();
        window.history.back();
    }

    const openRef = useRef(null)
    const [open, setOpen] = closeDropdown(openRef, false)
    const handleClick = () => setOpen(!open)
    const handleDropdownClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const editRef = useRef(null)
    const [edit, setEdit] = closeDropdown(editRef, false)
    const handleEditDropdown = () => setEdit(!edit)
    const handleOpenModal = (formType, props) => {
        return e => {
            e.preventDefault();
            closeModal()
            setOpen(false)
            openModal(formType, props)
        }
    }
    
    const firstBoardName = boards[currentUser.boards[0]]?.name
    const pin = pins[pinId]
    const creator = users[pin?.creator]
    const ownsPin = creator?.id === currentUser?.id

    const content = () => {
        return (
            <div>
                <div onClick={handleGoBack} className="pin-show-background"></div>
                <div className="pin-show-container">
                    <div className='pin-show-image-container'
                        style={{backgroundImage: `url(${pin.imageUrl}` }}
                    >
                    </div>
                    <div className="pin-show-right-container">
                        <div className="pin-show-heading">
                            <div 
                            className={`pin-options ${ownsPin ? "show" : "hide"}`}
                            >
                                <p  ref={editRef} onClick={handleEditDropdown}>...</p>
                                <div className={`options-menu ${ edit ? "open" : "closed"}`}>
                                    <p>Pin options</p>
                                    <div 
                                        onClick={handleOpenModal('edit board', props)} // potentially fill in props
                                        className="edit-board-option">Edit pin</div>
                                </div>
                            </div>
                            <div className="pin-show-boards">
                                <div 
                                    onClick={handleDropdownClick} 
                                    className={`show-pin pin-add-menu ${open ? "open" : "closed"}`}>
                                    <AddPinDropdown/> 
                                </div>
                                <div className={`pin-item-hover-board-name`}>
                                    <div className={`pin-dropdown-trigger`} onClick={handleClick} ref={openRef}>
                                        <h1 >{abbreviate(`${firstBoardName}`, MAX_BOARD_CHAR)}</h1>
                                        <i className='fa-solid fa-chevron-down fa-xs'></i>
                                    </div>
                                    <SavePinButton/>
                                </div>
                            </div>
                            <div className='pin-text'>
                                <div className='pin-title'>{pin.title}</div>
                                <div className='pin-description'>{pin.description}</div>
                            </div>
                            <div className='pin-show-creator'>
                                <UserPreviewContainer user={creator}/>
                            </div>
                        </div>
                        <div className='pin-comments'>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
    
    return loading ? <LoadingContainer/> : content()
}

const mSTP = ({session, entities: { users, pins, boards }}, props) => {
    return {
        pinId: props.match.params.pinId,
        currentUser: users[session.id], 
        pins, 
        users, 
        boards
    }
}

const mDTP = dispatch => {
    return {
        fetchPin: (pinId) => dispatch(fetchPin(pinId)),
        fetchBoards: (userId) => dispatch(fetchBoards(userId)), 
        fetchUser: (userId) => dispatch(fetchUser(userId))
    }
}

export default connect(mSTP, mDTP)(PinShowContainer)