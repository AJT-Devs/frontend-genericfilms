//Search Function

function searchReserve() {
    //Aqui será implementado o sistema de busca
}

//Delete Reserve Function

function deleteReserve(card) {
    // Aqui você pode adicionar a lógica para remover o item do banco de dados.
    card.remove();
}

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function() {
        deleteReserve(card);
        closeModal("modal-confirm-delete");
    });
}

//Get Reserve Function

function getAllReserves() {
    const cardsList = document.getElementById("cards-list");
    // cardsList é a section onde os cards de Reserve serão exibidos.
    // Aqui você pode adicionar a lógica para buscar os Reserves do banco de dados.
}

//Add Reserve Function
function addReserve() {
   window.location.href = "../../adm/screens/register/register-reserve.html";
}

//Edit Reserve Function
function editReserve(btn) {
    const card = btn.closest(".card");
    const reserveId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/edit/edit-reserve.html?id=${reserveId}`;

}

//Go to ticket preview

function goToTicketPreview(btn){
    const card = btn.closest(".card");
    const reserveId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/preview-ticket.html?id=${reserveId}`;
}

function openSectionIsHalf(qtdMeias){
    const section = document.getElementById('is-half');
    let i = 0;
    const input = `
        <label for="docHalfPass#${i}">Documento de meia entrada #${i}</label>
        <input type="text" placeholder="Informe o código do documento comprobatório " id="docHalfPass#${i}" required>
    `

    const qtdInputs = qtdMeias.value;

    addInputDocHalfPass(i, qtdInputs);

    i += (i - qtdInputs);   
}

function addInputDocHalfPass(i, qtdInputs){
    const section = document.getElementById('is-half');

    for(i; i<qtdInputs; i++){
        const input = `
            <label for="docHalfPass#${i}">Documento de meia entrada #${i}</label>
            <input type="text" placeholder="Informe o código do documento comprobatório " id="docHalfPass#${i}" required>
        `
        section.innerHTML += input;
    }
}