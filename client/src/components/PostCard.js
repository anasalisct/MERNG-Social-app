import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const likePost = () => {};
  const commentPost = () => {};
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={likePost}
          basic={true}
          color="teal"
          content="Like"
          icon="heart"
          label={{
            basic: true,
            color: "teal",
            pointing: "left",
            content: likeCount,
          }}
        />
        <Button
          onClick={commentPost}
          basic={true}
          color="blue"
          icon="comments"
          label={{
            basic: true,
            color: "blue",
            pointing: "left",
            content: commentCount,
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default PostCard;
