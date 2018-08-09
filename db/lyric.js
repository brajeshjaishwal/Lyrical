const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

LyricSchema.statics.like = async (id) => {
  const Lyric = mongoose.model('lyric');
  try{
    var lyric = await Lyric.findById(id)
    ++lyric.likes
    return await lyric.save()
  }catch(err)
  {
    throw new Error(err)
  }
}

var Lyrics = mongoose.model('lyric', LyricSchema);

module.exports = { Lyrics }