const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
    title: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    lyrics: [{
      type: Schema.Types.ObjectId,
      ref: 'lyric'
    }]
  });

  SongSchema.statics.addLyric = async (id, content) => {
    try{
        const Lyric = mongoose.model('lyric');
        const Song = mongoose.model('song')
        let song = await Song.findById(id);
        const lyric = new Lyric({content, song})
        await lyric.save()
        song.lyrics.push(lyric)
        return await song.save()
    }catch(err)
    {
        throw new Error(err)
    }  
  }

  SongSchema.statics.findLyrics = (id) => {
    const Song = mongoose.model('song')
    return Song.findById(id)
      .populate('lyrics') 
      .then(song => song.lyrics);
  }

  const Songs = mongoose.model('song', SongSchema)

  module.exports = { Songs }