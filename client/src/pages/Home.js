import React from "react";

import { useQuery } from "@apollo/client";
import { FETCH_POSTS } from "../queries/queries";
import { Grid, Image } from "semantic-ui-react";
import PostCard from "../components/PostCard";
const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS);
  if (posts) {
    console.log(posts);
  }
  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts ...</h1>
        ) : posts ? (
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: "8px" }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        ) : (
          <h1>not</h1>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
