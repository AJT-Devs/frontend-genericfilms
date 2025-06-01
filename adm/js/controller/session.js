//Search Function

function searchSession() {
    //Aqui será implementado o sistema de busca
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
function addSession() {
   window.location.href = "../../adm/screens/register/register-session.html";
}

//Edit Session Function
function editSession(btn) {
    const card = btn.closest(".card");
    const sessionId = card.getAttribute("id");
    
    console.log(card, sessionId);

    window.location.href = `../../adm/screens/edit/edit-session.html?id=${sessionId}`;
}