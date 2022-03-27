import React from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../services/queries/queries";

const AddBook = (props) => {
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
  return (
    <>
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Author:</label>
          <select>
            <DisplayAuthor />
          </select>
        </div>
        <button>+</button>
      </form>
    </>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
