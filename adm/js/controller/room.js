//Load Rooms Function
async function loadRooms() {
    const cinema = await getCinema();
    if(!cinema) return;
    const cinemaId = +cinema.id;

    const response = await fetch(`${urlServer}/room/list/${cinemaId}`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();

    const listRoom = document.getElementById("cards-list");
    listRoom.innerHTML = "";

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

    const header = document.querySelector("#main-header h1");
    const title = document.querySelector("title");
    header.innerHTML = `${cinema.name} - Salas`;
    title.innerHTML = `ADM - Salas de ${cinema.name}`;

    const rooms = data || [];

    rooms.forEach(room =>{
        listRoom.innerHTML += `
            <section class="card" id="${room.id}" tabindex="0" aria-label="Sala ${room.name}; ID#${room.id}">
                <div aria-label="Sala ${room.name} ID#${room.id}">
                    <i aria-label="Ícone de poltrona">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tv-minimal-icon lucide-tv-minimal"><path d="M7 21h10"/><rect width="20" height="14" x="2" y="3" rx="2"/></svg>
                    </i>
                    <p title="Sala ${room.name}">Sala ${room.name}</p>
                    <p>ID#${room.id}</p>
                </div>
                <div>
                    <button onclick="goToSessions(this)">Sessões</button>
                    <button onclick="editRoom(this)">Editar</button>
                    <button onclick="openModalConfirmDelete(this)">Deletar</button>
                </div>
            </section>
        `;
    })

}

async function loadRegisterRoom(){
    const cinema = await getCinema();
    if(!cinema) return;

    const header = document.querySelector("#title-pagina-p");
    const title = document.querySelector("title");
    const inputCinemaName = document.querySelector("#localization");
    header.innerHTML = `Cadastrar Sala de ${cinema.name}`;
    title.innerHTML = `ADM - Cadastrar Sala de ${cinema.name}`;
    inputCinemaName.value = cinema.name;

}

async function loadEditRoom(){
    const cinema = await getCinema();
    if(!cinema) return;

    const room = await getRoom();
    if(!room) return;

    const header = document.querySelector("#title-pagina-p");
    const title = document.querySelector("title");
    const inputCinemaName = document.querySelector("#localization");
    header.innerHTML = `Editar Sala ${room.name} de ${cinema.name}`;
    title.innerHTML = `ADM - Editar Sala ${room.name} de ${cinema.name}`;
    inputCinemaName.value = cinema.name;

    fillEditForm();
}

async function fillEditForm() {
    const room = await getRoom();
    if (!room) return;
    const cinema = await getCinema();
    if (!cinema) return;

    const form = document.getElementById("form-edit-room");
    form.name.value = room.name;
    form.numSeats.value = room.numSeats;
    form.numPCD.value = room.numPCD;
    form.localization.value = cinema.name; 
}

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    modal.style.display = "block";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function() {
        deleteRoom(card);
        closeModal("modal-confirm-delete");
    });
}

//Add Room Function
function addRoom() {
    const urlParams = new URLSearchParams(window.location.search);
    const cinemaId = urlParams.get("cinema");

    if(!cinemaId) return;
    window.location.href = `../../adm/screens/register/register-room.html?cinema=${cinemaId}`;
}

//Edit Room Function
function editRoom(btn) {
    const card = btn.closest(".card");
    const roomId = card.getAttribute("id");
    const urlParams = new URLSearchParams(window.location.search);
    const cinemaId = urlParams.get("cinema");
    if(!cinemaId) return;
    window.location.href = `../../adm/screens/edit/edit-room.html?cinema=${cinemaId}&room=${roomId}`;
}

//Go to Sessions Function

async function goToSessions(btn){
    const card = btn.closest(".card");
    const roomId = card.getAttribute("id");
    const cinema = await getCinema();
    const cinemaId = cinema.id;

    window.location.href = `../../adm/screens/sessions.html?cinema=${cinemaId}&room=${roomId}`;
}

//Route Create Room
async function createRoom() {

    const cinema = await getCinema();
    if(!cinema) return;
    const cinemaId = cinema.id;
    if(!cinemaId) return;

    const form = document.getElementById("form-register-room");
    const room = {
        name: form.name.value,
        idCinema: +cinemaId,
        numSeats: +form.numSeats.value,
        numPCD: +form.numPCD.value
    }

    const response = await fetch(`${urlServer}/room/`, {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(room)
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
    
    alert("Sala cadastrada com sucesso!");
    window.location.href = `../../screens/rooms.html?cinema=${cinemaId}`;
}

//Route Edit Room
async function updateRoom() {
    const form = document.getElementById("form-edit-room");
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("room");
    const cinemaId = urlParams.get("cinema");
    if(!cinemaId || !roomId) return;

    const room = {
        name: form.name.value,
        idCinema: +cinemaId,
        numSeats: +form.numSeats.value,
        numPCD: +form.numPCD.value
    }

    const response = await fetch(`${urlServer}/room/${roomId}`, {
        method: "PUT",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(room)
    });

    if(response.status === 400) {
        const error = await response.json();
        console.error("Erro 400: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 404) {
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

    alert("Sala atualizada com sucesso!");
    window.location.href = `../../screens/rooms.html?cinema=${cinemaId}`;
}

//Delete Room Function

async function deleteRoom(card) {
    const roomId = card.getAttribute("id");

    const response = fetch(`${urlServer}/room/${+roomId}`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
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