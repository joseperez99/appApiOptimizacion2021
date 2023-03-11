$(document).ready(function(){
    $('ul.tabs li a:first').addClass('active');
    $('.selections article').hide();
    $('.selections article:first').show();

    $('ul.tabs li a').click(function(){
		
        $('ul.tabs li a').removeClass('active');
	    $(this).addClass('active');
	    $('.selections article').hide();

	    var activeTab = $(this).attr('href');
	    $(activeTab).show();
	    return false;
    });
})


const urlStops =        "http://localhost:8080/stops";
const urlCompanies =    "http://localhost:8080/transportCompanies";
const urlFrames =       "http://localhost:8080/frames"

var myInit = {method: 'GET', mode: 'cors'};

function loadCompaniesList() {

    // let loadCont = document.getElementById('loader');
    let element = document.getElementById('companiesList');
    let elementErr = document.getElementById('errCompanies');
    
    // loadCont.style.visibility = "visible"
    // loadCont.style.opacity= "1";
    
    fetch(urlCompanies, myInit)
    .then(response => response.json())
    .then(data =>
        {
            var htmlToInsert =  "";
            for(x of data){
                console.log(x)
                htmlToInsert =  htmlToInsert +
                                "<tr>"+
                                    "<td headers='id' scope='row'>"                  +x.id+          "</td>"+
                                    "<td headers='name' scope='row'>"                +x.name+        "</td>"+
                                    "<td headers='logo' scope='row'>"+
                                        "<img src='"    +x.logo+    "' onerror=this.src='noLogo.jpg'>"+
                                    "</td>"+
                                "</tr>";
            }

            element.innerHTML=htmlToInsert;
            
            // loadCont.style.visibility = "hidden";
            // loadCont.style.opacity= "0";
        })
    .catch(err => 
        {
            elementErr.innerHTML= `<p> Error: ${err}</p>`;
            // loadCont.style.visibility = "hidden";
            // loadCont.style.opacity= "0";
        });
}
function errImg(){
    this.src="noLogo.jpg"
}

function loadStopsList() {

    // let loadCont = document.getElementById('loader');
    let element = document.getElementById('stopsList');
    let elementErr = document.getElementById('errStops');
    
    // loadCont.style.visibility = "visible"
    // loadCont.style.opacity= "1";
    
    fetch(urlStops, myInit)
    .then(response => response.json())
    .then(data =>
        {
            var htmlToInsert =  "";
            for(x of data){
                htmlToInsert =  htmlToInsert +
                                "<tr>"+
                                    "<td headers='id' scope='row'>"         +x.id+          "</td>"+
                                    "<td headers='name' scope='row'>"       +x.name+        "</td>"+
                                    "<td headers='city' scope='row'>"       +x.city+        "</td>"+
                                    "<td headers='province' scope='row'>"   +x.province+    "</td>"+
                                    "<td headers='country' scope='row'>"    +x.country+     "</td>"+
                                    "<td headers='ranking' scope='row'>"    +x.ranking+     "</td>"+
                                "</tr>";
            }

            element.innerHTML=htmlToInsert;
            
            // loadCont.style.visibility = "hidden";
            // loadCont.style.opacity= "0";
        })
    .catch(err => 
        {
            elementErr.innerHTML= `<p> Error: ${err}</p>`;
            // loadCont.style.visibility = "hidden";
            // loadCont.style.opacity= "0";
        });
}

function loadFramesList() {

    // let loadCont = document.getElementById('loader');
    let element = document.getElementById('framesList');
    let elementErr = document.getElementById('errFrames');
    
    // loadCont.style.visibility = "visible"
    // loadCont.style.opacity= "1";
    
    fetch(urlFrames, myInit)
    .then(response => response.json())
    .then(data =>
        {
            var htmlToInsert =  "";
            for(x of data){
                htmlToInsert =  htmlToInsert +
                                "<tr>"+
                                    "<td headers='id' scope='row'>"                     +x.id+                  "</td>"+
                                    "<td headers='idTransportCompany' scope='row'>"     +x.idTransportCompany+  "</td>"+
                                    "<td headers='idStopDeparture' scope='row'>"        +x.idStopDeparture+     "</td>"+
                                    "<td headers='idStopArrival' scope='row'>"          +x.idStopArrival+       "</td>"+
                                    "<td headers='price' scope='row'>$"                 +x.price+               "</td>"+
                                    "<td headers='departureDateTime' scope='row'>"      +x.departureDateTime+   "</td>"+
                                    "<td headers='arrivalDateTime' scope='row'>"        +x.arrivalDateTime+     "</td>"+
                                "</tr>";
            }

            element.innerHTML=htmlToInsert;
            
            // loadCont.style.visibility = "hidden";
            // loadCont.style.opacity= "0";
        })
    .catch(err => 
        {
            elementErr.innerHTML= `<p> Error: ${err}</p>`;
            // loadCont.style.visibility = "hidden";
            // loadCont.style.opacity= "0";
        });
}
