import { gql } from "apollo-boost";

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

export const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

export const getBookQuery = gql`
  query ($id: ID) {
    book(id: $id) {
      name
      id
      genre
      author {
        id
        name
        age
        books {
          name
          genre
          id
        }
      }
    }
  }
`;
