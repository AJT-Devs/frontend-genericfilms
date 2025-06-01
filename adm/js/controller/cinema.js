//Search Function

function searchCinema() {
    //Aqui será implementado o sistema de busca
}

//Delete Cinema Function

function deleteCinema(card) {
    // Aqui você pode adicionar a lógica para remover o item do banco de dados.
    card.remove();
}

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function() {
        deleteCinema(card);
        closeModal("modal-confirm-delete");
    });
}

//Get Cinema Function

function getAllCinemas() {
    const cardsList = document.getElementById("cards-list");
    // cardsList é a section onde os cards de cinema serão exibidos.
    // Aqui você pode adicionar a lógica para buscar os cinemas do banco de dados.
}

//Add Cinema Function
function addCinema() {
   window.location.href = "../../adm/screens/register/register-cinema.html";
}

//Edit Cinema Function
function editCinema(btn) {
    const card = btn.closest(".card");
    const cinemaId = card.getAttribute("id");
    
    console.log(card, cinemaId);

    window.location.href = `../../adm/screens/edit/edit-cinema.html?id=${cinemaId}`;
}

//Ir para Salas do cinema

function goToRooms(btn) {
    const card = btn.closest(".card");
    const cinemaId = card.getAttribute("id");
    
    console.log(card, cinemaId);

    window.location.href = `../../adm/screens/rooms.html?id=${cinemaId}`;
}