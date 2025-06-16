// async function loadAdmins() {
//     const response = await fetch("http://localhost:3000/admin/all");
//     const data = await response.json();

//     const listAdmin = document.getElementById("cards-list");
//     listAdmin.innerHTML = "";

//     if(response.status === 500) {
//         const error = await response.json();
//         console.error("Erro 500: ", error);
//         alert(error.message);
//         return;
//     }
//     else if(response.status === 404) {
//         const error = await response.json();
//         console.error("Erro 404: ", error);
//     }

//     //console.log(data);

//     const admins = data.admins || [];

//     //console.log(admins);

//     admins.forEach(admin =>{
//         listAdmin.innerHTML += `
//            
//         `;
//     })

// }

//Delete Admin Function

function deleteAdmin(card) {
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
        deleteAdmin(card);
        closeModal("modal-confirm-delete");
    });
}

//Add Admin Function
function addAdmin() {
   window.location.href = "../../adm/screens/register/register-admin-adm.html";
}

//Edit Admin Function
function editAdmin(btn) {
    const card = btn.closest(".card");
    const adminId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/edit/edit-admin-adm.html?id=${adminId}`;
}