"use strict";

const { gql } = require("apollo-server");

const typeDefs = gql`
  type Artist {
    artist_id: Int!
    name: String!
    created: String!
  }
  input artistInput {
    artist_id: Int
    name: String
  }
  type Query {
    artist(input: artistInput): Artist
    artists: [Artist]!
  }
  input newArtistInput {
    name: String!
  }
  input updateArtistValueInput {
    name: String!
  }
  input updateArtistSelectorInput {
    artist_id: Int
    name: String
  }
  input updateArtistInput {
    values: updateArtistValueInput!
    selector: updateArtistSelectorInput
  }
  input deleteArtistInput {
    artist_id: Int
    name: String
  }
  type Mutation {
    newArtist(input: newArtistInput): Artist!
    updateArtist(input: updateArtistInput): [Artist]!
    deleteArtist(input: deleteArtistInput): [Artist]!
  }
`;

module.exports = typeDefs;
