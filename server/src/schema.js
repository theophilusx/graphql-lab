"use strict";

const { gql } = require("apollo-server");

const typeDefs = gql`
  type Artist {
    artist_id: Int!
    name: String!
    songs: [Song]!
    created: String!
  }
  input artistInput {
    artist_id: Int
    name: String
  }
  type Song {
    song_id: Int!
    artist: Artist!
    title: String!
    created: String!
  }
  input songInput {
    song_id: Int
  }
  input songsInput {
    title: String
    artist_id: Int
  }
  type Query {
    artist(input: artistInput): Artist
    artists: [Artist]!
    song(input: songInput): Song
    songs(input: songsInput): [Song]!
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
  input newSongInput {
    artist_id: Int!
    title: String!
  }
  input updateSongValuesInput {
    artist_id: Int
    title: String
  }
  input updateSongSelectorInput {
    song_id: Int
    artist_id: Int
    title: String
  }
  input updateSongInput {
    values: updateSongValuesInput
    selector: updateSongSelectorInput
  }
  input deleteSongInput {
    song_id: Int
    artist_id: Int
    title: String
  }
  type Mutation {
    newArtist(input: newArtistInput): Artist!
    updateArtist(input: updateArtistInput): [Artist]!
    deleteArtist(input: deleteArtistInput): [Artist]!
    newSong(input: newSongInput): Song!
    updateSong(input: updateSongInput): [Song]!
    deleteSong(input: deleteSongInput): [Song]!
  }
`;

module.exports = typeDefs;
