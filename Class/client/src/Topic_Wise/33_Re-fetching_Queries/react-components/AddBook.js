import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../services/queries/queries";

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
        name: addBookField.name,
        genre: addBookField.genre,
        authorId: addBookField.authorId,
      },
      // now after we had mutate if we want to render that mutated book we have to re-fetch that book for that graphQL provide us 'refetchQueries'
      refetchQueries: [{ query: getBooksQuery }],
      // [<different_query_that_we_want_to_re-fetch>]
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
