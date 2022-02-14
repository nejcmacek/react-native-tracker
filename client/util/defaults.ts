const ui = {
	accent: "#F44336",
	secondary: "#d097ed",
	textBlack: "rgba(0,0,0,0.6)"
}

const server = {
	serverIP: "164.8.160.247",
	serverPort: "3000",
	serverAddress: "http://"
}
server.serverAddress += server.serverIP + ":" + server.serverPort

const misc = {
	defaultErrorMessage: "An unknown error has occurred.",
	hashes: "####################################################################################################"
}

export {
	ui,
	server,
	misc,
}