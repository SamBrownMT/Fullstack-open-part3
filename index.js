const express = require('express')
const app = express()

app.use(express.json())

let list = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request,response) => {
	response.json(list)
})

app.post('/api/persons', (request,response) => {
	const RandId = Math.floor(Math.random() * 100000);

	const person = request.body

	if (!person.name || !person.number) {
		return response.status(400).json({
			error: 'number or name missing'
		})
	}

	if (list.filter(entry => entry.name === person.name)
		.length !== 0) {
		return response.status(400).json({
			error: 'name already taken'
		})
	}

	person.id = RandId 

	list = list.concat(person)

	response.json(person)
})

app.get('/api/persons/:id',(request,response) => {
	const id = Number(request.params.id)
	const person = list.find(e => e.id === id)
	if (person) {
		response.json(person)
	}
	else {
		response.status(404).end()
	}
	
})

app.delete('/api/persons/:id', (request,response) => {
	const id = Number(request.params.id)
	list = list.filter(person => person.id !== id)

	response.status(204).end()
})

app.get('/info',(request,response) => {
	response.send(`<h1>Phonebook has info for ${list.length} people</h1>
			<h1>${new Date()}</h1>`)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
})