const url = "http://localhost:8080/algorithm/run/";

var myInit = {
				method: 'GET', // *GET, POST, PUT, DELETE, etc.
    			mode: 'cors', // no-cors, *cors, same-origin
    		//	cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    		//	credentials: 'same-origin', // include, *same-origin, omit
    		//	headers: {
    		//				'origin':'localhost'
    		//				'Access-Control-Allow-Origin':'null'
      		//				'Content-Type': 'application/json'
     		//				'Content-Type': 'application/x-www-form-urlencoded',
    		//			},
    		//	redirect: 'follow', // manual, *follow, error
    		//	referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    		//	body: JSON.stringify(data) // body data type must match "Content-Type" header
			 };

fetch(url, myInit)
.then(response => response.json())
.then(data =>
	{
		console.log(data)
		let element = document.getElementById('elem')
		var htmlToInsert = ""
		for(x of data){
			htmlToInsert =	htmlToInsert +
							"<p>-------------------</p>"+
							"<p>id: "+x.id+"</p>"+
							"<p>name: "+x.name+"</p>"+
							"<p>city: "+x.city+"</p>"+
							"<p>province: "+x.province+"</p>"+
							"<p>country: "+x.country+"</p>"+
							"<p>ranking: "+x.ranking+"</p>";
		}
		element.innerHTML=htmlToInsert
	})
.catch(err => console.log(err))
 