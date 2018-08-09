const {GraphQLObjectType,
       GraphQLBoolean,
       GraphQLInt,
       GraphQLNonNull,
       GraphQLID,
       GraphQLString,
    } = require('graphql')

const mongoose = require('mongoose')

const lyricType = new GraphQLObjectType({
    name: "Lyric",
    fields: () => ({
        id: {type: GraphQLID},
        likes: { type: GraphQLInt},
        content: {type: GraphQLString},
        song: {
            type: require('./song'),
            resolve: (root) => {
                try{
                    const Lyrics = mongoose.model('lyric');
                    Lyrics.findById(root.id).populate('song').then(lyric => lyric.song)
                }catch(err) {
                    throw new Error(err)
                }
            }
        }
    })
})

module.exports = lyricType