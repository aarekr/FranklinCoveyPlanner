const config = require('../utils/config')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB ')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const taskSchema = new mongoose.Schema({
  done: Boolean,
  priority: {
    type: String,
    minlength: 1,
    maxlength: 1,
    required: true,
  },
  number: Number,
  name: {
    type: String,
    minlength: 1,
    required: true,
  },
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Task', taskSchema)
