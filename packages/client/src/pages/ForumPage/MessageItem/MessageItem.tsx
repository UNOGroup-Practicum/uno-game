import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import { Avatar, IconButton, Typography } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";

import React, { useState } from "react";

import { MessageType, User } from "services/api/types";
import { useDispatch, useSelector } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";
import { forumThunks } from "services/slices/forum-slice";

import { RootState } from "../../../services/store";
import { AddMessageType } from "../ForumMessagesListPage";
import { timeOptions } from "../helpers/timeOptions";
import { MessageForm } from "../MessageForm/MessageForm";

import { MessageReplyItem } from "./MessageReplyItem";

import styles from "./MessageItem.module.scss";

type PropsType = {
  messageData: MessageType;
  addMessage: AddMessageType;
};
const getLikesCount = createSelector(
    (state: RootState) => state.forum.currentReactions,
    (state: RootState, messageData: MessageType) => messageData.id,
    (currentReactions, messageId) =>
      currentReactions.filter(
        (reaction) => reaction.message_id === messageId && reaction.reaction === "like"
      ).length
  ),
  getMyLikeId = createSelector(
    (state: RootState) => state.forum.currentReactions,
    (state: RootState, messageData: MessageType) => messageData.id,
    (state: RootState, messageData: MessageType, user: User) => user.id,
    (currentReactions, messageId, userId) =>
      currentReactions.filter(
        (reaction) =>
          reaction.message_id === messageId &&
          reaction.reaction === "like" &&
          reaction.user_id === userId
      )[0]?.id
  ),
  getParentMessageText = createSelector(
    (state: RootState) => state.forum.currentMessages,
    (state: RootState, messageData: MessageType) => messageData?.parent_message_id,
    (currentMessages, parentMessageId) =>
      currentMessages.filter((message) => message.id === parentMessageId)[0]?.message
  );

export const MessageItem: React.FC<PropsType> = ({ messageData, addMessage }) => {
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(authSelect).user as User;

  const myLikeId = useSelector((state) => getMyLikeId(state, messageData, user)),
    likesCount = useSelector((state) => getLikesCount(state, messageData));

  let parentMessageText = null;
  if (messageData?.parent_message_id) {
    parentMessageText = useSelector((state) => getParentMessageText(state, messageData));
  }

  const onClickLike = (reaction: string) => {
    if (!myLikeId) {
      const dataRequest = {
        theme_id: messageData.theme_id,
        message_id: messageData.id,
        user_id: user.id,
        reaction,
      };
      dispatch(forumThunks.postReaction(dataRequest));
    } else {
      dispatch(forumThunks.deleteReaction(myLikeId));
    }
  };

  return (
    <>
      <div className={styles.MessageItem}>
        <div className={styles.MessageItem__user}>
          <Avatar alt="Avatar" src={`${__API_ENDPOINT__}/resources${messageData.user_avatar}`} />
          <p className={styles.MessageItem__user_username}>{messageData.user_display_name}</p>
        </div>

        {parentMessageText && <MessageReplyItem message={parentMessageText} />}

        <p className={styles.MessageItem__text}>{messageData.message}</p>

        <p
          className={styles.MessageItem__text + " " + styles.MessageItem__data}
          suppressHydrationWarning={true}
        >
          Сообщение написано {new Date(messageData.createdAt).toLocaleString("ru", timeOptions)}
        </p>
        <IconButton
          className={styles.MessageItem__reply}
          color="warning"
          onClick={() => setIsComment(!isComment)}
        >
          <ReplyIcon />
        </IconButton>
        <IconButton
          className={styles.MessageItem__like}
          color="error"
          onClick={() => onClickLike("like")}
        >
          {myLikeId ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <Typography variant="subtitle2" ml={1}>
            {likesCount}
          </Typography>
        </IconButton>
      </div>
      {isComment && (
        <MessageForm
          addMessage={addMessage}
          placeholder={"Ответить"}
          parent_message_id={messageData.id}
          setIsComment={setIsComment}
        />
      )}
    </>
  );
};
