const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'd230c1c4b37142d6ae25c813cdf3a5a3'
});

const handleApiCall = (req, res) => {
 app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 .then(data => {
 	res.json(data);
 })
 .catch(err => res.status(400).json('Unable to work with api'))
}

const handleImage = (req,res,db)=>{
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries',1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
	handleImage,  
	handleApiCall
}