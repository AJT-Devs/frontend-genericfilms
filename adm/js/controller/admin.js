//Search Function

function searchAdmin() {
    //Aqui será implementado o sistema de busca
}

//Delete Admin Function

function deleteAdmin(card) {
    // Aqui você pode adicionar a lógica para remover o item do banco de dados.
    card.remove();
}

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function() {
        deleteAdmin(card);
        closeModal("modal-confirm-delete");
    });
}

//Get Admin Function

function getAllAdmins() {
    const cardsList = document.getElementById("cards-list");
    // cardsList é a section onde os cards de Admin serão exibidos.
    // Aqui você pode adicionar a lógica para buscar os Admins do banco de dados.
}

//Add Admin Function
function addAdmin() {
   window.location.href = "../../adm/screens/register/register-user-adm.html";
}

//Edit Admin Function
function editAdmin(btn) {
    const card = btn.closest(".card");
    const adminId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/edit/edit-user-adm.html?id=${adminId}`;

}