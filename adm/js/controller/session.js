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

    const sessions = data || [];

    sessions.forEach(session =>{
        listSession.innerHTML += `
            <section class="card" id="${session.id}" tabindex="0" aria-label="Sessão em ${cinema.name}; do filme [Titulo do filme]; em [Data] e [Horário]; [ID#0000]">
                <div aria-label="Sessão em [Localização]; do filme [Filme]; em [Data] e [Horário]; [ID#0000]">
                    <i aria-label="Ícone de pipoca">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-popcorn-icon lucide-popcorn"><path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"/><path d="M10 22 9 8"/><path d="m14 22 1-14"/><path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"/></svg>
                    </i>
                    <p title="[Titulo do Filme] - [DD/MM/AAAA] - [HH:MM]">Titulo do Filme - DD/MM/AAAA - HH:MM</p>
                    <p>ID#0000</p>
                </div>
                <div>
                    <button onclick="editSession(this)">Editar</button>
                    <button onclick="openModalConfirmDelete(this)">Deletar</button>
                </div>
            </section>
        `;
    })
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