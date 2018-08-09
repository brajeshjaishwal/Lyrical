var mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const LyricType = require('./lyric');

const SongType = new GraphQLObjectType({
  name:  'Song',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(root) {        
        const Song = mongoose.model('song');
        return Song.findLyrics(root.id);
      }
    }
  })
});

module.exports = SongType;