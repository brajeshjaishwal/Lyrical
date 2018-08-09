const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const SongType = require('./song');
const LyricType = require('./lyric');
const { Lyrics } = require('../db/lyric')
const { Songs } = require('../db/song')


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    info: {
      type: GraphQLString,
      resolve: () => {
        return "Hello, there"
      }
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve: () => {
        return Songs.find({});
      }
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(root, { id }) {
        return Songs.findById(id);
      }
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(root, { id }) {
        return Lyrics.findById(id);
      }
    }
  })
});

module.exports = RootQuery;