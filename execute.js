const urlRun = "http://localhost:8080/algorithm/run?ids=";
var myInit = {method: 'GET', mode: 'cors'};

const wrappers = document.querySelectorAll(".wrapper");
const selectBtns = [];  wrappers.forEach( wrapper => selectBtns.push(wrapper.querySelector(".select-btn")));
const searchInps = [];  wrappers.forEach(wrapper => searchInps.push(wrapper.querySelector("input")));
const options = [];     wrappers.forEach(wrapper => options.push(wrapper.querySelector(".options")));

/* GET STOPS */
const urlStops = "http://localhost:8080/stops";
let elementStopsErr = document.getElementById('errStops');
var stopsObjects = [];
var stopsNames = ["Seleccione una estacion"];
fetch(urlStops, myInit)
.then(response => response.json())
.then(data => { 
    for(stop of data){ 
        stopsObjects.push(stop);
        stopsNames.push(`${stop.name}, ${stop.city}, ${stop.province}`)
    }
    options.forEach((option,id) => addStopsNames(id));
})
.catch(err => { elementStopsErr.innerHTML = `<p> Error Loading Stops: ${err}</p>`; });

/* GET TRANSPORTS COMPANIES */
const urlCompanies = "http://localhost:8080/transportCompanies";
let elementTransportsCompaniesErr = document.getElementById('errTransportsCompanies');
var transportCompaniesObjects = [];
fetch(urlCompanies, myInit)
.then(response => response.json())
.then(data => { 
    for(transportCompany of data){ 
        transportCompaniesObjects.push(transportCompany);
    }
})
.catch(err => { elementTransportsCompaniesErr.innerHTML = `<p> Error Loading Transports Companies: ${err}</p>`; });

/* OPTIONS SELECTORS */
function addStopsNames(id){
    options[id].innerHTML=""; 
    stopsNames.forEach(stopName => {
        let li = `<li onclick="updateName(${id}, this)">${stopName}</li>`;
        options[id].insertAdjacentHTML("beforeend", li);
    })
}

function updateName(id, selectedLi){
    searchInps[id].value = "";
    addStopsNames(id);
    wrappers[id].classList.remove("active");
    selectBtns[id].firstElementChild.innerText = selectedLi.innerText;
}

searchInps.forEach((searchInp, id) => searchInp.addEventListener("keyup", () =>{
    let arr = [];
    let searchedVal = searchInp.value.toLowerCase();
    arr = stopsNames.filter(data => {
        return data.toLowerCase().includes(searchedVal);
    }).map(data => `<li onclick="updateName(${id}, this)">${data}</li>`).join("");

    options[id].innerHTML = arr ? arr: `<p>Oops! Estacion no encontrada</p>`;
}));

selectBtns.forEach((selectBtn,id) => selectBtn.addEventListener("click", () => {
    wrappers[id].classList.toggle("active");
}));

/* TIME DIFF */
function timeDiff(departureTime, arrivalTime){
    let departureT = departureTime.split(":").map(x => parseInt(x));
    let arrivalT = arrivalTime.split(":").map(x => parseInt(x));
    let time1 = departureT[0] * 60 + departureT[1];
    let time2 = arrivalT[0] * 60 + arrivalT[1];
    if(time1 <= time2){ return (time2 - time1); }
    else{ return (1440 - time1 + time2); }
};

/* EXECUTION */
function loadSolution() {

    let loadCont = document.getElementById('loader');
    let element = document.getElementById('solution');
    
    loadCont.style.visibility = "visible"
    loadCont.style.opacity= "1";

    let stopsSelected = [];
    selectBtns.forEach( selectBtn => {
        if (selectBtn.firstElementChild.textContent != 'Seleccione una estacion'){
            stopsSelected.push(selectBtn.firstElementChild.textContent)
        }
    });

    let ids = stopsSelected.map(stopSelected => {
        let name = stopSelected.split(', ')
        let stop = stopsObjects.find(stopObject => (stopObject.name == name[0] && stopObject.city == name[1] && stopObject.province == name[2]))
        try{ return stop.id;}
        catch (e) { return -1;}
        
    })
    
    urlRequest = urlRun + ids.join(',')
    fetch(urlRequest, myInit)
    .then(response => response.json())
    .then(data =>
        {
            let totalPrice = 0;
            let totalTime = 0;
            let htmlToInsert =  "<div class='travel-itinerary'>"+
                                    `<p class='MilkyShake-h2'>Itinerario de Viaje</p>`;
            for(x of data){

                totalPrice += x.price;
                let duration = timeDiff(x.departureDateTime, x.arrivalDateTime);
                totalTime += duration;

                stopDeparture = stopsObjects.find(stopObject => (stopObject.id == x.idStopDeparture))
                stopArrival = stopsObjects.find(stopObject => (stopObject.id == x.idStopArrival))
                transportCompany = transportCompaniesObjects.find(transportCompanyObjects => (transportCompanyObjects.id == x.idTransportCompany))

                htmlToInsert =  htmlToInsert +
                                    `<div class="frame">`+
                                        `<div class="company-logo">`+
                                            `<img src='${transportCompany.logo}' onerror=this.src='noLogo.jpg'>`+
                                        `</div>`+
                                        `<ul class="frame-info">`+
                                            `<li class="company-name">`+
                                                `<p>`+
                                                    `<span class="boldTxt">Empresa: </span>`+
                                                    `<span class="italicTxt">${transportCompany.name}</span>`+
                                                `</p>`+
                                            `</li>`+
                                            `<li class="stop-departure">`+
                                                `<p>`+
                                                    `<span class="boldTxt">Origen: </span>`+
                                                    `<span class="italicTxt">${stopDeparture.name}, ${stopDeparture.city}</span>`+
                                                `</p>`+
                                            `</li>`+
                                            `<li class="stop-arrival">`+
                                                `<p>`+
                                                    `<span class="boldTxt">Llegada: </span>`+
                                                    `<span class="italicTxt">${stopArrival.name}, ${stopArrival.city}</span>`+
                                                `</p>`+
                                            `</li>`+
                                            `<li class="price">`+
                                                `<p>`+
                                                    `<span class="boldTxt">Precio del pasaje: </span>`+
                                                    `<span class="italicTxt">$${x.price}</span>`+
                                                `</p>`+
                                            `</li>`+
                                            `<li class="category">`+
                                                `<p>`+
                                                    `<span class="boldTxt">Categoria: </span>`+
                                                    `<span class="italicTxt">${x.category}</span>`+
                                                `</p>`+
                                            `</li>`+
                                            `<li class="departure-datetime">`+
                                                `<p>`+
                                                    `<span class="boldTxt">Horario de partida: </span>`+
                                                    `<span class="italicTxt">${x.departureDateTime}</span>`+
                                                `</p>`+
                                            `</li>`+
                                            `<li class="arrival-datetime">`+
                                                `<p>`+
                                                    `<span class="boldTxt">Horario de llegada: </span>`+
                                                    `<span class="italicTxt">${x.arrivalDateTime}</span>`+
                                                `</p>`+
                                            `</li>`+
                                            `<li class="arrival-datetime">`+
                                                `<p>`+
                                                    `<span class="boldTxt">Duracion: </span>`+
                                                    `<span class="italicTxt">${Math.trunc(duration/60)}h${duration%60}</span>`+
                                                `</p>`+
                                            `</li>`+
                                        `</ul>`+
                                    `</div>`
                                };
            htmlToInsert =  htmlToInsert + 
                                    `<div class="totalCost">`+
                                        `<p>`+
                                            `<span class="boldTxt">Costo total: </span>`+
                                            `<span class="italicTxt">$${totalPrice}</span>`+
                                        `</p>`+
                                        `<p>`+
                                            `<span class="boldTxt">Duracion total: </span>`+
                                            `<span class="italicTxt">${Math.trunc((totalTime/60))}h${(totalTime%60)}</span>`+
                                        `</p>`+
                                    `</div>`
                                "</div>";
            element.innerHTML=htmlToInsert;
            loadCont.style.visibility = "hidden";
            loadCont.style.opacity= "0";
        })
    .catch(err => 
        {
            element.innerHTML= `<p>No hay conexion con el Servidor ${err}</p>`;
            loadCont.style.visibility = "hidden";
            loadCont.style.opacity= "0";
        });
}