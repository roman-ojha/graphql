import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getAuthorsQuery, addBookMutation } from "../services/queries/queries";

/*
  -> so previously we had use 'addBookMutation()' to mutate to add book but we have not pass any value on that mutation
  -> to get the value that we have send from client to graphQl mutation there is a method called 'query variable'
  -> when we will mutate at that time we have to pass all the possible mutation value:
    -> const addBookMutation = gql`
          mutation($name: String!, $genre: String!, $authorId: ID!) {
            // $<Query_variable>: <Type>
            // ! = Not Null(require)
            addBook(name: "", genre: "", authorId: "") {
              name
              genre
            }
          }
        `;
*/

const AddBook = (props) => {
  const [addBookField, setAddBookField] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const DisplayAuthor = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      return <option>Authors are loading...</option>;
    }
    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };
  const addBook = (e) => {
    e.preventDefault();
    props.addBookMutation({
      variables: {
        // now here we can pass the query variables
        name: addBookField.name,
        genre: addBookField.genre,
        authorId: addBookField.authorId,
      },
    });
  };
  return (
    <>
      <form id="add-book" onSubmit={addBook}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            value={addBookField.name}
            onChange={(e) => {
              setAddBookField({
                ...addBookField,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={addBookField.genre}
            onChange={(e) => {
              setAddBookField({
                ...addBookField,
                genre: e.target.value,
              });
            }}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            onChange={(e) => {
              setAddBookField({
                ...addBookField,
                authorId: e.target.value,
              });
            }}
          >
            <option>Select Author</option>
            <DisplayAuthor />
          </select>
        </div>
        <button>+</button>
      </form>
    </>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
