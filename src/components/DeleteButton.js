import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { GET_NEWS_QUERY } from '../gqlQueries/queries';

function DeleteButton({ newsId, callback , commentId}) {
  // console.log("comments in delete button", comments)
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutationQuery = commentId ? DELETE_COMMENT : DELETE_NEWS

  const [deleteNews] = useMutation(mutationQuery, {
    update(proxy) {
      setConfirmOpen(false);

      //DELETING from cache
      if(!commentId){
      const data = proxy.readQuery({
        query: GET_NEWS_QUERY
      });
      data.getNews = data.getNews.filter((n) => n.id !== newsId);
      proxy.writeQuery({ query: GET_NEWS_QUERY, data });
      if (callback) callback();
      console.log("being deleted")}
    },
    variables: {
      newsId,
      commentId
    }
  });
  return (
    <>
      <Button
        as="div"
        floated="right"
        onClick={() => setConfirmOpen(true)}
        className = "delete-button"
      >
        <Icon name="trash alternate outline" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteNews}
      />
    </>
  );
}

const DELETE_NEWS = gql`
  mutation deleteNews($newsId: ID!) {
    deleteNews(newsId: $newsId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($newsId: ID!, $commentId: ID!){

    deleteComment(newsId: $newsId, commentId: $commentId){
      id
      comments{
        id
        userName
        createdAt
        body
      }
      commentCount
    }

  }
`

export default DeleteButton;