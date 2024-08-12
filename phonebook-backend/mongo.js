const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://eyu:${password}@cluster-fo.vubfjvd.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const name = process.argv[3]
const number = process.argv[4]

if (name && number) {
	const contact = new Contact({
		name: name,
		number: number,
	})

	contact.save().then(() => {
		console.log(`added ${name} number ${number} to phonebook`)
		mongoose.connection.close()
	})
} else {
	Contact.find({}).then((res) => {
		console.log('phonebook:')
		res.forEach((contact) => {
			console.log(contact.name, contact.number)
		})
		mongoose.connection.close()
	})
}
