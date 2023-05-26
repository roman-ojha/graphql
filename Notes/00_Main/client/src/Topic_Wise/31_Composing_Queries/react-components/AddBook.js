import React, { useState } from "react";
import { graphql } from "react-apollo";
// import {compose} from 'react-apollo';
// compose was removed from 'apollo' so we will use 'lodash'
import { flowRight as compose } from "lodash";
import { getAuthorsQuery, addBookMutation } from "../services/queries/queries";

/*
  -> previously we had one query to bind with this component but now we also want to bind component with 'addBookMutation'
  -> to bind both query there is different method but we will use compose method:
      -> compose(
          graphql(getAuthorsQuery, { name: "getAuthorQuery" }),
          graphql(addBookMutation, { name: "addBookMutation" })
        )(AddBook);
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
    props.addBookMutation();
    // now here to make mutation we have bind the mutation in this component because of that now we can call the function through 'props'
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
  // 'name' will pass as the props now because we have more then one query we have to pass the name to get the specific query data
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
