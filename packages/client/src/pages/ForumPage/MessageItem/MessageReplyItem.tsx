import { Card, CardContent, Typography } from "@mui/material";

import styles from "./MessageItem.module.scss";

type PropsType = {
  message: string;
};
export const MessageReplyItem: React.FC<PropsType> = ({ message }) => {
  return (
    <Card className={styles.MessageReply}>
      <CardContent>
        <Typography color="text.secondary">{message}</Typography>
      </CardContent>
    </Card>
  );
};
