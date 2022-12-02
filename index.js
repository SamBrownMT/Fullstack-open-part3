require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
var morgan = require('morgan')

morgan.token('content', (req, res) => {
	return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons',(request,response) => {
	Person.find({}).then(people => {
		response.json(people)
	})
})

app.post('/api/persons', (request,response) => {
	const person = request.body

	if (!person.name || !person.number) {
		return response.status(400).json({
			error: 'number or name missing'
		})
	}

	const newPerson = new Person({
		name: person.name,
		number: person.number,
	})

	newPerson.save().then(savedPerson => {
		response.json(savedPerson)
	})
})

app.get('/api/persons/:id',(request,response) => {
  Person.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/persons/:id', (request,response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

app.get('/info',(request,response) => {
	response.send(`<h1>Phonebook has info for ${list.length} people</h1>
			<h1>${new Date()}</h1>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
})
