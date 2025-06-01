//Search Function

function searchUser() {
    //Aqui será implementado o sistema de busca
}

//Delete User Function

function deleteUser(card) {
    // Aqui você pode adicionar a lógica para remover o item do banco de dados.
    card.remove();
}

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function() {
        deleteUser(card);
        closeModal("modal-confirm-delete");
    });
}

//Get User Function

function getAllUsers() {
    const cardsList = document.getElementById("cards-list");
    // cardsList é a section onde os cards de User serão exibidos.
    // Aqui você pode adicionar a lógica para buscar os Users do banco de dados.
}

//Add User Function
function addUser() {
   window.location.href = "../../adm/screens/register/register-user.html";
}

//Edit User Function
function editUser(btn) {
    const card = btn.closest(".card");
    const userId = card.getAttribute("id");
    
    console.log(card, userId);

    window.location.href = `../../adm/screens/edit/edit-user.html?id=${userId}`;
}