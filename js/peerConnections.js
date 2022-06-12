var peer = new Peer();

var joinGameButton = document.querySelector("#joinGameButton");
var joinGameInput = document.querySelector("#joinGameInput");

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
	peerURL = createPeerURL(peer.id);
	console.log(peerURL);

	$("#copyInviteLink").click(function() {
		navigator.clipboard.writeText(createPeerURL(peer.id));
	});

	$("#copyInviteID").click(function() {
		navigator.clipboard.writeText(peer.id);
	});

	peer.on("connection", function(conn) {
		conn.on("open", function() {

			conn.on("data", function(data) {
				console.log("Received data: " + data);
			});
		
			conn.send("First sent data!");

			conn.on("close", function() {
				console.log("Peer connection closed")
			})
		
		})
	});

  });

joinGameButton.addEventListener("click", function() {
	console.log("Join Game ID: " + joinGameInput.value)
	conn = peer.connect(joinGameInput.value);

	conn.on("open", function() {

		conn.on("data", function(data) {
			console.log("Received data: " + data);
		});
	
		conn.send("First sent data!");
	
		conn.on("close", function() {
			console.log("Peer connection closed")
		})
	})
})


function createPeerURL(peerID) {
	const URL = window.location.host;
	const PROTOCOL = window.location.protocol;
	return "" + PROTOCOL + "//" + URL + "/?id=" + peerID;
}

function recieveConnection() {
	peer.on("connection", function(conn) {
		return conn;
	});
}

function copyInviteID() {

}