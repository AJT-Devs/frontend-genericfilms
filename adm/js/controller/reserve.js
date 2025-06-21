// Load reserves by reserve
async function loadReservesByUser(){
    const user = await getUser();
    if(!user) return;
    const userId = user.id;


    const response = await fetch(`http://localhost:3000/ticket/list/${userId}`,{
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });

    const data = await response.json();

    const listReserve = document.getElementById("cards-list");
    listReserve.innerHTML = "";

    if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }


    const header = document.querySelector("#main-header h1");

    header.innerHTML = `${user.name} - Reservas`;


    const reserves = data || [];

    // console.log(reserves);

    reserves.forEach(reserve =>{
        //console.log(reserve);

        const ticket = {
            id: reserve.id,
            isPCD: reserve.isPCD ? " (PCD)" : "",
            //isHalf: reserve.isHalf,
            seat : reserve.seat,
            typeReserve: reserve.typeReserve,
            startDate : reserve.startDate,
            startHour : reserve.startHour,
            endHour : reserve.endHour,
            //format : reserve.format,
            //language : reserve.language,
            //roomName : reserve.name,   
            cinemaName : reserve.cinemaName,
            //cinemaAddress : reserve.address,
            //cinemaCity : reserve.city,
            //cinemaUF : reserve.uf,
            movieTitle : reserve.movieTitle,
            //moviePoster : reserve.poster,
            //price: reserve.price,
            //qrcode: reserve.qrcode
        }

        //console.log("Ticket: ", ticket);

        listReserve.innerHTML += `
            <section class="card" id="${ticket.id}" tabindex="0" aria-label="${ticket.typeReserve} - ${ticket.seat}${ticket.isPCD} - ${ticket.startDate} - ${ticket.movieTitle} - ${ticket.cinemaName} - ${ticket.startHour} - ${ticket.endHour}; ID#${ticket.id}">
                <div aria-label="Reservas de ${user.name}; ID#${ticket.id}">
                    <i aria-label="Ícone de ingresso">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-reserve-icon lucide-reserve"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>    
                    </i>
                    <p title="${ticket.typeReserve} - ${ticket.seat}${ticket.isPCD} - ${ticket.startDate} - ${ticket.movieTitle} - ${ticket.cinemaName} - ${ticket.startHour} - ${ticket.endHour}">
                        ${ticket.typeReserve} - ${ticket.seat}${ticket.isPCD} - ${ticket.startDate} - ${ticket.movieTitle} - ${ticket.cinemaName} - ${ticket.startHour} - ${ticket.endHour}</p>
                    <p>ID#${ticket.id}</p>
                </div>
                <div>
                    <button onclick="goToReservePreview(this)">Acessar ingresso</button>
                    <button onclick="goToValidateReserve(${ticket.id})">Validar ingresso</button>
                    <button onclick="openModalConfirmDelete(this)">Deletar</button>
                </div>
            </section>
        `;
    })
    
}

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    modal.style.display = "block";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function() {
        deleteReserve(card);
        closeModal("modal-confirm-delete");
    });
}

function goToValidateReserve(reserveId){
    window.location.href = `../../adm/screens/validate.html?reserve=${reserveId}`;
}
//Add Reserve Function
async function addReserve() {
    const user = await getUser();
    window.location.href = `../../adm/screens/register/register-reserve.html?user=${user.id}`;
}

//Edit Reserve Function
function editReserve(btn) {
    const card = btn.closest(".card");
    const userId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/edit/edit-reserve.html?id=${userId}`;

}

//Go to reserve preview

function goToReservePreview(btn){
    const card = btn.closest(".card");
    const ticketId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/preview-ticket.html?ticket=${ticketId}`;
}

let indexQtdMeias = 0;

function openSectionIsHalf(qtdMeias){
    let i;
    // const qtdInputs = +qtdMeias.value;

    // console.log("qtdInputs = " +  qtdInputs)

    i =  qtdMeias - indexQtdMeias;

    // console.log("i = " + i)
    // console.log("indexQtdMeias = " + indexQtdMeias)

    if(i==0) return;

    if(i>0){
        while(i>0){
        addInputDocHalfPass();

        i--;
    }
    }
    else if(i<0){
        while(i<0){
            removeInputDocHalfPass();
            
            i++;
        }
    }
}

function addInputDocHalfPass(){
    const section = document.getElementById('is-half');
    const i = indexQtdMeias + 1;

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Informe o código do documento comprobatório')
    input.setAttribute('id', `docHalfPass#${i}`)
    input.setAttribute('name', `docHalfPass#${i}`);
    input.setAttribute('aria-label', `Documento de meia entrada #${i}`);
    input.required = true;
    input.addEventListener('input', checkFormStatus);

    const label = document.createElement('label');
    label.setAttribute('for', `docHalfPass#${i}`);
    label.innerText = `Documento de meia entrada #${i}`;


    // console.log("Add input")
    section.appendChild(label);
    section.appendChild(input);
    indexQtdMeias++;
}
function removeInputDocHalfPass(){
    const section = document.getElementById('is-half');
    const label = section.querySelectorAll('label')[indexQtdMeias - 1];
    const input = section.querySelectorAll('input')[indexQtdMeias - 1];
    // console.log("Remove input")

    label.remove(); 
    input.remove();
    indexQtdMeias--;
}

async function fillRegisterReserve(){
    const form = document.getElementById("form-register-reserve");
    if(!form) return;

    const cinemas = await getAllCinemas();
    if(!cinemas) return;
    const movies = await getAllMovies();
    if(!movies) return;

    const selectCinema = form.selectCinema;
    const selectMovie = form.selectMovie;
    const selectSession = form.selectSession;

    // console.log("Cinemas: ", cinemas);
    // console.log("Movies: ", movies);

    movies.forEach(movie => {
        selectMovie.innerHTML += `
        <option value="${movie.id}">${movie.title}</option>
        `;
    });
    cinemas.forEach(cinema => {
        selectCinema.innerHTML += `
        <option value="${cinema.id}">${cinema.name}</option>
        `;
    });

    selectSession.disabled = true;
    const checkboxes = Array.from(document.querySelectorAll('.div-map-seats input[type="checkbox"]'));

    checkboxes.forEach(e =>{
        e.disabled = true;
    })

    selectCinema.addEventListener("input", async function() {
        if(selectCinema.value !== "" && selectMovie.value !== "") {
            await fillSelectSession(selectCinema.value, selectMovie.value);
            checkboxes.forEach(e =>{
                e.disabled = true;
            })
        }
        else{
            selectSession.disabled = true;
            selectSession.innerHTML = "";
            selectSession.innerHTML += `
                <option value="">Selecione a sessão</option>
            `;
            checkboxes.forEach(e =>{
                e.disabled = true;
            })
        }
    });
    selectMovie.addEventListener("input", async function() {
        if(selectCinema.value !== "" && selectMovie.value !== "") {
            await fillSelectSession(selectCinema.value, selectMovie.value);
            checkboxes.forEach(e =>{
                e.disabled = true;
            })
        }
        else{
            selectSession.disabled = true;
            selectSession.innerHTML = "";
            selectSession.innerHTML += `
                <option value="">Selecione a sessão</option>
            `;
            checkboxes.forEach(e =>{
                e.disabled = true;
            })
        }
    });
    selectSession.addEventListener("input", async function() {

        await loadSeatsChoosed(selectSession.value);
    });
}

async function fillSelectSession(cinemaId, movieId){
    if(cinemaId == "" || movieId == "") {
        selectSession.disabled = true;
    }
    const form = document.getElementById("form-register-reserve");
    const selectSession = form.selectSession;

    const sessions = await getSessionsByCinema(cinemaId);
    if(!sessions) return;

    selectSession.disabled = false;
    selectSession.innerHTML = "";
    selectSession.innerHTML += `
        <option value="">Selecione a sessão</option>
        `;

    sessions.forEach(session => {

        if(session.idMovie == movieId){
            const [datePart, timePart] = session.startDate.split("T");
            session.startTime = timePart.substring(0, 5).replace(":", "h");
            session.startDate = datePart.split("-").reverse().join("/");
            const endTimePart = session.endHour.split("T")[1];
            session.endHour = endTimePart.substring(0, 5).replace(":", "h");
    
            selectSession.innerHTML += `
            <option value="${session.id}">${session.startDate} - ${session.startTime} - ${session.endHour}</option>
            `;
        }

    });
}

async function getSessionsByCinema(cinemaId) { 
    const response = await fetch(`${urlServer}/room/list/${cinemaId}`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 404) {
        const error = await response.json();
        console.error("Erro 404: ", error);
        alert(error.message);
        return;
    }

    const rooms = data || [];

    // console.log("Rooms: ", rooms);

    let sessionsData = {};

    let i = 0;

    for (const room of rooms) {
        const roomId = room.id;
        sessionsData[i] = await getSessionsByRoom(roomId);
        i++;
    }

    const sessions = Object.values(sessionsData).flat();

    return sessions;
}

async function getSessionsByRoom(roomId){
    const response = await fetch(`${urlServer}/session/list/${roomId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();

    if (response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }
    else if (response.status === 404) {
        const error = await response.json();
        console.error("Erro 404: ", error);
    }

    // console.log("Sessions by room: ", data.sessions);

    return data.sessions || [];
}

function handleSeats(){
    const checkboxes = Array.from(document.querySelectorAll('.div-map-seats input[type="checkbox"]'));

    const marked = checkboxes
        .filter(checkbox => checkbox.checked)
        .map(checkbox => ({
            id: checkbox.id,
            value: checkbox.value,
            isPCD: checkbox.name.includes('(PCD)') ? true : false
        }));

    // console.log(marked);
    return marked;
}

async function configReserve(){
    const form = document.getElementById("form-register-reserve");
    const marked = handleSeats();
    let qtdHalf = form.numHalf.value;
    const checkboxes = Array.from(document.querySelectorAll('.div-map-seats input[type="checkbox"]'));
    const qtdMarkeds = checkboxes.filter(cb => cb.checked).length;

    const user = await getUser();
    
    let reservas = [];

    let halfDocs = [];
    for (let i = 1; i <= qtdHalf; i++) {
        const input = document.getElementById(`docHalfPass#${i}`);
        halfDocs.push(input ? input.value : null);
    }

    // Gera reservas
    for (let i = 0; i < qtdMarkeds; i++) {
        const isHalf = i < qtdHalf;
        if(halfDocs[i] == null){
            reservas.push({
                buyDate: new Date(),
                method: form.selectPayment.value,
                isPCD: marked[i].isPCD,
                seat: marked[i].value,
                isHalf: isHalf,
                idUser: user.id,
                idSession: +form.selectSession.value
            });
        }
        else{
            reservas.push({
                buyDate: new Date(),
                method: form.selectPayment.value,
                isPCD: marked[i].isPCD,
                seat: marked[i].value,
                isHalf: isHalf,
                halfDoc: halfDocs[i],
                idUser: user.id,
                idSession: +form.selectSession.value
            });
        }
    }

    // console.log(reservas)

    return reservas;
}

async function createReserve() {
    const reservas = await configReserve();

    let userId = 0;

    for(const reserva of reservas){
        // console.log(reserva)
        userId = reserva.idUser;
        const response = await fetch(`${urlServer}/reserve/`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(reserva)
        });

        if(response.status === 400) {
        const error = await response.json();
        console.error("Erro 400: ", error);
        alert(error.message);
        return;
        }
        else if(response.status === 500) {
            const error = await response.json();
            console.error("Erro 500: ", error);
            alert(error.message);
            return;
        }

        console.log("Cadastro [" + reserva.seat + "] Feita com sucesso")

    }



    alert("Reservas cadastradas com sucesso!");
    window.location.href = `../../screens/reserves.html?user=${userId}`;
}

function validValueInputNumTicket(){
    const input = document.querySelector('input[type="number"]');
    const numMax = ifCheckboxFilled()

    // console.log(numMax)

    if(!input) return;

    if(input.value > numMax) input.value = numMax;
    else if(input.value < 0) input.value = 0;
    
    openSectionIsHalf(input.value);
}

async function loadSeatsChoosed(sessionId) {
    if(sessionId == "") {
        checkboxes.forEach(e =>{
            e.disabled = true;
        })
        return;
    };
    const checkboxes = Array.from(document.querySelectorAll('.div-map-seats input[type="checkbox"]'));
    const reserves = await getAllReservesBySession(+sessionId);

    if(reserves == null) {
        checkboxes.forEach(e =>{
            e.disabled = false;
        })
        return;
    }
        
    const seatsIsBusy = reserves.map(reserve => reserve.seat);

    // console.log(seatsIsBusy)

    checkboxes.forEach(e =>{
        e.disabled = false;
        if (seatsIsBusy.includes(e.value)) {
            e.disabled = true;
        }
    })

    // console.log(sessionId)


    // console.log(reserves)

}

async function getAllReservesBySession(sessionId){
    const user = await getUser();
    if(!user) return;
    const userId = user.id;


    const response = await fetch(`http://localhost:3000/reserve/list/${userId}`,{
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }) || null;

    if(response.status == "404") return null;

    const data = await response.json();

    if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 404) {
        const error = await response.json();
        console.error("Erro 404: ", error);
    }

    // console.log(data.result, sessionId)

    const reserves = (data.result).filter(reserve => reserve.idSession === sessionId) || null;
    
    return reserves;
}

async function deleteReserve(card) {
    const reserveId = card.getAttribute("id");

    const response = fetch(`${urlServer}/reserve/${+reserveId}`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials : "include"
    });


    if(response.status === 404) {
        const error = await response.json();
        console.error("Erro 404: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }

    card.remove();
}
