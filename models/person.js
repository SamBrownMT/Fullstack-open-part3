const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numberValidator = (phoneNumber) => {
	phoneNumberArray = phoneNumber.split("-")

	return (phoneNumberArray.every((number) => {
		return number.match(/[^0-9]/) === null
	}))
}

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number:  {
		type: String,
		minLength: 8,
		required: true,
		validate: {
			validator: numberValidator,
			message: props => `${props.value} is not a valid phone number`
		},
		
	},
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)