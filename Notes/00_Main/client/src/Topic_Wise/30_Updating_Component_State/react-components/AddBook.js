import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../services/queries/queries";

const AddBook = (props) => {
  const [addBookField, setAddBookField] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const DisplayAuthor = () => {
    const data = props.data;

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

export default graphql(getAuthorsQuery)(AddBook);
