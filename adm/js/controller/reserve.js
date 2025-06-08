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

let indexQtdMeias = 0;

function openSectionIsHalf(qtdMeias){
    let i;
    const qtdInputs = +qtdMeias.value;

    // console.log("qtdInputs = " +  qtdInputs)

    i =  qtdInputs - indexQtdMeias;

    // console.log("i = " + i)
    // console.log("indexQtdMeias = " + indexQtdMeias)

    if(i==0) return;

    if(i>0){
        while(i>0){
        addInputDocHalfPass();

        i--;
    }
    }
    else if(i<0){
        while(i<0){
            removeInputDocHalfPass();
            
            i++;
        }
    }
}

function addInputDocHalfPass(){
    const section = document.getElementById('is-half');
    const i = indexQtdMeias + 1;

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Informe o código do documento comprobatório')
    input.setAttribute('id', `docHalfPass#${i}`)
    input.required = true;
    input.addEventListener('input', checkFormStatus);

    const label = document.createElement('label');
    label.setAttribute('for', `docHalfPass#${i}`);
    label.innerText = `Documento de meia entrada #${i}`;


    // console.log("Add input")
    section.appendChild(label);
    section.appendChild(input);
    indexQtdMeias++;
}
function removeInputDocHalfPass(){
    const section = document.getElementById('is-half');
    const label = section.querySelectorAll('label')[indexQtdMeias - 1];
    const input = section.querySelectorAll('input')[indexQtdMeias - 1];
    // console.log("Remove input")

    label.remove(); 
    input.remove();
    indexQtdMeias--;
}