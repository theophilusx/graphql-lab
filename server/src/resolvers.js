"use strict";

const utils = require("../db/utils");

module.exports = {
  Query: {
    artist: async (_, { input }, ctx) => {
      let filter = utils.selectorToFilter(input);
      let rs = await ctx.models.Artist.find(filter);
      return rs[0];
    },
    artists: async (_, __, ctx) => {
      let rs = await ctx.models.Artist.find();
      return rs;
    },
    song: async (_, { input }, ctx) => {
      let filter = utils.selectorToFilter(input);
      let rs = await ctx.models.Song.find(filter);
      return rs[0];
    },
    songs: async (_, { input }, ctx) => {
      let filter;
      if (input) {
        filter = utils.selectorToFilter(input);
      }
      let rs = await ctx.models.Song.find(filter);
      return rs;
    },
  },
  Mutation: {
    newArtist: async (_, { input }, ctx) => {
      let rs = await ctx.models.Artist.create(input);
      return rs;
    },
    updateArtist: async (_, { input }, ctx) => {
      let filter = utils.selectorToFilter(input.selector);
      let rs = await ctx.models.Artist.update(input.values, filter);
      return rs;
    },
    deleteArtist: async (_, { input }, ctx) => {
      let filter = utils.selectorToFilter(input);
      let rs = await ctx.models.Artist.delete(filter);
      return rs;
    },
    newSong: async (_, { input }, ctx) => {
      let rs = await ctx.models.Song.create(input);
      return rs;
    },
    updateSong: async (_, { input }, ctx) => {
      let filter = utils.selectorToFilter(input.selector);
      let rs = await ctx.models.Song.update(input.values, filter);
      return rs;
    },
    deleteSong: async (_, { input }, ctx) => {
      let filter = utils.selectorToFilter(input);
      let rs = await ctx.models.Song.delete(filter);
      return rs;
    },
  },
  Song: {
    artist: async (song, __, ctx) => {
      let artist_id = song.artist_id;
      let rs = await ctx.models.Artist.find({
        column: "artist_id",
        value: artist_id,
      });
      return rs[0];
    },
  },
  Artist: {
    songs: async (artist, _, ctx) => {
      let artist_id = artist.artist_id;
      let rs = await ctx.models.Song.find({
        column: "artist_id",
        value: artist_id,
      });
      return rs;
    },
  },
};
