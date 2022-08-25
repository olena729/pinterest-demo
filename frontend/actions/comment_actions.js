import * as CommentAPIUtil from "../util/comment_util"
import { receivePin } from "./pin_actions";

export const fetchComments = (pinId) => dispatch => (
    CommentAPIUtil.fetchPinComments(pinId).then(pin => (
      dispatch(receivePin(pin))
    ))
);

export const deleteComment = (pinId, commentId) => dispatch => (
    CommentAPIUtil.deleteComment(pinId, commentId).then((pin) => (
      dispatch(receivePin(pin))
    ))
);

export const createComment = (pinId, text) => dispatch => (
    CommentAPIUtil.createComment(pinId, text).then(pin => (
      dispatch(receivePin(pin))
    ))
);