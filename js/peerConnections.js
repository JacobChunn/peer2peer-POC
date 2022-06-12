/*
A script that allows a peer to connect to another peer by generating a
peer ID, or by accepting a peer ID to connect to. Created with PeerJS
Made by Jacob Chunn
*/

// Create peer object to connect to
var peer = new Peer();

// Get both the join button and input
var joinButton = document.querySelector("#joinButton");
var joinInput = document.querySelector("#joinInput");

// On peer start, get ID of self and dictate rules of
// what happens when connected to another peer
peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);

	// Copy ID of self to clipboard when Copy ID button is clicked
	$("#copyInviteID").click(function() {
		navigator.clipboard.writeText(peer.id);
	});

	// Dictate rules of peer connection and disconnection
	peer.on("connection", function(conn) {
		conn.on("open", function() {

			// When data is recieved, log the data
			conn.on("data", function(data) {
				console.log("Received data: " + data);
			});
			
			// On peer connected, send a string of data
			conn.send("First sent data!");

			// Log when peer connection is closed
			conn.on("close", function() {
				console.log("Peer connection closed")
			})
		
		})
	});

  });

// Connect to provided peer ID when join button is clicked and
// dictate rules of connection and disconnection
joinButton.addEventListener("click", function() {
	console.log("Join with Peer ID: " + joinInput.value)
	conn = peer.connect(joinInput.value);

	// Dictate rules of peer connection and disconnection
	conn.on("open", function() {

		// When data is recieved, log the data
		conn.on("data", function(data) {
			console.log("Received data: " + data);
		});

		// On peer connected, send a string of data
		conn.send("First sent data!");
		
		// Log when peer connection is closed
		conn.on("close", function() {
			console.log("Peer connection closed")
		})
	})
})