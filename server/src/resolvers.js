"use strict";

const utils = require("../db/utils");

module.exports = {
  Query: {
    artist: async (_, { input }, ctx) => {
      console.log(`input: ${JSON.stringify(input)}`);
      let filter = utils.selectorToFilter(input);
      let rs = await ctx.models.Artist.find(filter);
      return rs[0];
    },
    artists: async (_, __, ctx) => {
      let rs = await ctx.models.Artist.find();
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
  },
};
