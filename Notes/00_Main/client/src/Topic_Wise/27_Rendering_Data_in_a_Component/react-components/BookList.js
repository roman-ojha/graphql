import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

const BookList = (props) => {
  const DisplayBooks = () => {
    var data = props.data;
    // we will get the query data on 'props.data'
    if (data.loading) {
      // if 'loading' is true
      return <div>Loading Books...</div>;
    }
    return (
      <div>
        {data.books.map((book, index) => {
          return <li key={book.id}>{book.name}</li>;
        })}
      </div>
    );
  };
  return (
    <>
      <ul id="book-list">
        <DisplayBooks />
      </ul>
    </>
  );
};

export default graphql(getBooksQuery)(BookList);
