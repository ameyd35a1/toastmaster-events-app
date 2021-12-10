import React, { FC, useState } from 'react'
import { Button, Comment, Form } from 'semantic-ui-react';
import { getFormattedDateTime } from '../../../../utility';
import { IComment } from '../../Interfaces/IEvent';

interface IReplyComponentProps {    
    reply: IComment,
    handleReply: (reply: string) => void
}

const ReplyComponent:FC<IReplyComponentProps> = ({ reply, handleReply }) => {

    const [isReply, setIsReply] = useState<boolean>(false)   
    const [replyText, setReplyText] = useState<string>('');

    return (
        <Comment.Group>
            <Comment>
                <Comment.Avatar as='a' src={'https://ts.accenture.com/sites/NEFS-ToastmastersClub/_layouts/15/userphoto.aspx?size=L&accountname=' + reply.userId} />
                <Comment.Content>
                    <Comment.Author as='a'>{reply.userName}</Comment.Author>
                    <Comment.Metadata>
                        <span>{getFormattedDateTime(new Date(reply.createdAt))}</span>
                    </Comment.Metadata>
                    <Comment.Text>{reply.body}</Comment.Text>
                    <Comment.Actions>
                        <a key={'R' + new Date(reply.createdAt).getTime()} onClick={() => setIsReply(x => !x)}>Reply</a>
                    </Comment.Actions>
                </Comment.Content>
                {isReply &&
                    <Form reply>
                        <Form.TextArea value={replyText} onChange={(x) => setReplyText(x.target.value)} />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => { setReplyText(''); setIsReply(false); return handleReply(replyText) }} />
                    </Form>
                }
            </Comment>
        </Comment.Group>
    )
}

export default ReplyComponent
