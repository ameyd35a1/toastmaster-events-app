import React, { FC, useEffect, useState } from 'react'
import { IComment } from '../../Interfaces/IEvent'
import { Button, Comment, Form, Header, Input } from 'semantic-ui-react'
import { decode } from 'html-entities'
import CommentsComponent from '../CommentsComponent/CommentsComponent'
import { useWebPartContext } from '../../../../hooks/useWebpartContext'
import { postComments } from '../../../../api'

interface ICommentsSectionComponentProps {
    data: string,
    id: number
}

const CommentsSectionComponent: FC<ICommentsSectionComponentProps> = ({ data, id }) => {

    const [comments, setComments] = useState<IComment[]>([])
    const [rootComments, setRootComments] = useState<IComment[]>([])
    const [newComment, setNewComment] = useState<string>("")

    const ctx = useWebPartContext(context => ({
        client: context.spHttpClient,
        user: context.pageContext.user.displayName,
        webUrl: context.pageContext.web.absoluteUrl,
        email: context.pageContext.user.email
    }));

    useEffect(() => {
        if (data && data.match(/(\[.*\])/)) {
            const temp = decode(data.match(/(\[.*\])/)[0])
            const commentsData: IComment[] = JSON.parse(temp);
            if (commentsData.length > 0) {
                setComments(commentsData)
            }
        }
    }, [data])

    useEffect(() => {
        if (comments) {
            const rcomments: IComment[] = comments.filter(e => e.parentId === 0)
            setRootComments(rcomments)
        }
    }, [comments])

    const getReplies = (commentId: number) => comments.filter(e => e.parentId === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    const postComment = async () => {
        if (newComment.trim()) {
            const latestComment: IComment = {
                userName: ctx.user,
                userId: ctx.email,
                id: comments.length + 1,
                parentId: 0,
                createdAt: new Date().toISOString(),
                body: newComment
            }
            const _comments = [...comments]
            _comments.push(latestComment)
            setNewComment("")
            setComments(_comments)
            await postComments(ctx.client, ctx.webUrl, id, _comments)            
        }
    }

    const handleReply = async (replyText: string, parentId: number) => {
        if (replyText.trim()) {
            const _reply: IComment = {
                userName: ctx.user,
                userId: ctx.email,
                id: comments.length + 1,
                parentId: parentId,
                createdAt: new Date().toISOString(),
                body: replyText
            }
            const _comments = [...comments]
            _comments.push(_reply)
            setComments(_comments)
            await postComments(ctx.client, ctx.webUrl, id, _comments)
        }
    }

    return (
        <div>
            {comments &&
                <Comment.Group threaded>
                    <Header as='h3' dividing>
                        Comments
                    </Header>
                    <Input
                        action={{
                            color: 'teal',
                            labelPosition: 'right',
                            icon: 'bolt',
                            content: 'Post',
                            onClick: () => postComment()
                        }}
                        placeholder="Post a message..."
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        style={{ width: "500px" }}
                    />
                    {rootComments.map(e =>
                        <CommentsComponent comment={e} replies={getReplies(e.id)} handleReply={handleReply} />
                    )}
                </Comment.Group>
            }
        </div>
    )
}

export default CommentsSectionComponent
