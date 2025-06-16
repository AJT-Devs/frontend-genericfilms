//Delete Room Function

function deleteRoom(card) {
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
        deleteRoom(card);
        closeModal("modal-confirm-delete");
    });
}

//Get Room Function

function getAllRooms() {
    const cardsList = document.getElementById("cards-list");
    // cardsList é a section onde os cards de Room serão exibidos.
    // Aqui você pode adicionar a lógica para buscar os Rooms do banco de dados.
}

//Add Room Function
function addRoom() {
   window.location.href = "../../adm/screens/register/register-room.html";
}

//Edit Room Function
function editRoom(btn) {
    const card = btn.closest(".card");
    const roomId = card.getAttribute("id");

    window.location.href = `../../adm/screens/edit/edit-room.html?id=${roomId}`;
}

//Go to Sessions Function

function goToSessions(btn){
    const card = btn.closest(".card");
    const roomId = card.getAttribute("id");

    window.location.href = `../../adm/screens/sessions.html?sala=${roomId}`;
}