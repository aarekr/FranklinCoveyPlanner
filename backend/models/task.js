const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const taskSchema = new mongoose.Schema({
    done: Boolean,
    priority: String,
    number: Number,
    name: String,
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Task', taskSchema)
