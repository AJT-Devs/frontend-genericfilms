async function loadSessions() {
    const cinema = await getCinema();
    if(!cinema) return;
    const room = await getRoom();
    if(!room) return;
    const roomId = +room.id;

    const response = await fetch(`${urlServer}/session/list/${roomId}`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();

    const listSession = document.getElementById("cards-list");
    listSession.innerHTML = "";

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
    header.innerHTML = `${cinema.name} - Sala ${room.name} - Sessões`;
    title.innerHTML = `ADM - Sessões de ${room.name} de ${cinema.name}`;

    //const sessions = data || [];

    // sessions.forEach(session =>{
    //     listSession.innerHTML += `
            
    //     `;
    // })
}
//Delete Session Function

function deleteSession(card) {
    // Aqui você pode adicionar a lógica para remover o item do banco de dados.
    card.remove();
}

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    modal.style.display = "block";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function() {
        deleteSession(card);
        closeModal("modal-confirm-delete");
    });
}

//Get Session Function

function getAllSessions() {
    const cardsList = document.getElementById("cards-list");
    // cardsList é a section onde os cards de Session serão exibidos.
    // Aqui você pode adicionar a lógica para buscar os Sessions do banco de dados.
}

//Add Session Function
async function addSession() {
    const cinema = await getCinema();
    if (!cinema) return;
    const cinemaId = cinema.id;

    const room = await getRoom();
    const roomId = room.id;
    
    window.location.href = `../../adm/screens/register/register-session.html?cinema=${cinemaId}&room=${roomId}`;
}

//Edit Session Function
async function editSession(btn) {
    const card = btn.closest(".card");
    const sessionId = card.getAttribute("id");

    const cinema = await getCinema();
    if (!cinema) return;
    const cinemaId = cinema.id;

    const room = await getRoom();
    const roomId = room.id;
    
    console.log(card, sessionId);

    window.location.href = `../../adm/screens/edit/edit-session.html??cinema=${cinemaId}&room=${roomId}&session=${sessionId}`;
}