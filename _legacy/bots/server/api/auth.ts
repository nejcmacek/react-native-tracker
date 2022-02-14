import attach from '../helpers/attach';

export default attach({ verb: 'post', path: '/api/auth/' }, context => {
	const { req, resolve, reject } = context
	console.log("Auth request:", req.body)
	const {
		username = undefined,
		password = undefined
	} = req.body || {}
	if (username === "nejc" && password === "12345")
		resolve({ token: "1234567890" })
	else reject("Invalid credentials.")
})
