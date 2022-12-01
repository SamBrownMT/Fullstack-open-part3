const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://main:${password}@cluster0.j59yet3.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	}
	number: {
		type: String,
		required: true,
	}
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
	console.log('retrieving all entries')
	mongoose.connect(url)
	Person.find({}).then(result => {	
		result.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()
	})
}

else {
	mongoose
		.connect(url)
		.then((result) => {
			console.log('connected')

			const person = new Person({
				name: process.argv[3],
				number: process.argv[4],
			})
		person.save().then(result => {
	  console.log('person saved!')
	  mongoose.connection.close()
		})
	})
}