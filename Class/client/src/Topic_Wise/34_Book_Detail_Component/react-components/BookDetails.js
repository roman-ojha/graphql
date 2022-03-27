import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../services/queries/queries";
const BookDetails = (props) => {
  return (
    <>
      <div id="book-details">
        <p>Book Detail</p>
      </div>
    </>
  );
};

export default graphql(getBookQuery)(BookDetails);
