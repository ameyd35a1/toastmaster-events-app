import React, { FC, useState } from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { getFormattedDateTime } from '../../../../utility'
import { IComment } from '../../Interfaces/IEvent'
import ReplyComponent from '../ReplyComponent/ReplyComponent'

interface ICommentsComponentProps {
    comment: IComment,
    replies?: IComment[],
    handleReply: (reply: string, parentId: number) => void
}

const CommentsComponent: FC<ICommentsComponentProps> = ({ comment, replies, handleReply }) => {

    const [isReplyParent, setIsReplyParent] = useState<boolean>(false)
    const [reply, setReply] = useState<string>('');

    const handleReplyContent = (replyText: string): void => {
        handleReply(replyText, comment.id);
    }

    return (
        <Comment>
            <Comment.Avatar as='a' src={'https://ts.accenture.com/sites/NEFS-ToastmastersClub/_layouts/15/userphoto.aspx?size=L&accountname=' + comment.userId} />
            <Comment.Content>
                <Comment.Author as='a'>{comment.userName}</Comment.Author>
                <Comment.Metadata>
                    <span>{getFormattedDateTime(new Date(comment.createdAt))}</span>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                    <a onClick={() => setIsReplyParent(e => !e)}>Reply</a>
                </Comment.Actions>
            </Comment.Content>
            {isReplyParent &&
                <Form reply>
                    <Form.TextArea value={reply} onChange={(e) => setReply(e.target.value)} />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => { setReply(''); setIsReplyParent(false); return handleReply(reply, comment.id) }} />
                </Form>
            }
            {
                replies && replies.map(e =>
                    <ReplyComponent reply={e} handleReply={handleReplyContent} key={'R' + new Date(e.createdAt).getTime()} />
                )
            }
        </Comment>
    )
}

export default CommentsComponent
