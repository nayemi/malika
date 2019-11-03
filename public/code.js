function initialize(){
	var socket = io.connect();
	
	socket.on("position", function(data){

		let countItems = JSON.stringify(data.x);
		document.getElementById("countItems").innerHTML = `Count: ${countItems}`;


		//console.log("datentyp : " ,typeof data.names);
		//console.log("inhalt : " , data.names);




		if(data.names !== undefined){

			data.names.forEach(function(element) {
				console.log(element);
				let div = document.createElement("div");
				let newContent = document.createTextNode(element);
  				div.appendChild(newContent);

  				document.body.appendChild(div);
			});
		}

		//document.getElementById("names").innerHTML = `current_object_names: ${data.names}`;
	});

}