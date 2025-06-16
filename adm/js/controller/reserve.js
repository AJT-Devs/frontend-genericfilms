// Load reserves by reserve
// async function loadReservesByUser(){
//     //const urlParam = new URLSearchParams(window.location.search);
//     //const reserveId = urlParam.get("id");

//     const response = await fetch("http://localhost:3000/reserve/list");
//     const data = await response.json();

//     const listReserve = document.getElementById("cards-list");
//     listReserve.innerHTML = "";

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

//     const reserves = data || [];

//     // console.log(reserves);

//     reserves.forEach(reserve =>{
//         console.log(reserve);

//         // const constructor = {
//         //     id: data.id,
//         //     isPCD: data.isPCD ? "(PCD)" : "",
//         //     seat: data.seat,
//         //     isHalf: data.isHalf ? "Meia" : "Inteira",
//         //     session: data.session,
//         // }

//         listReserve.innerHTML += `
//             <section class="card" id="${reserve.id}" tabindex="0" aria-label="${reserve.isHalf} - ${reserve.seat} - dd/mm - Titulo do filme - Sala - 00:00 - 00:00; [ID#0000]">
//                 <div aria-label="Reservas de [Usuário]; [ID#0000]">
//                     <i aria-label="Ícone de ingresso">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket-icon lucide-ticket"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>    
//                     </i>
//                     <p title="[Inteira - E5 - dd/mm - Titulo do filme - Sala - 00:00 - 00:00]">[Inteira - E5 - dd/mm - Titulo do filme - Sala - 00:00 - 00:00]</p>
//                     <p>ID#0000</p>
//                 </div>
//                 <div>
//                     <button onclick="goToTicketPreview(this)">Acessar ingresso</button>
//                     <button onclick="openModalConfirmDelete(this)">Deletar</button>
//                 </div>
//             </section>
//         `;
//     })
    
// }

// async function getSession(id){
//     const response = await fetch(`http://localhost:3000/session/${id}`);
//     if(response.status === 404) {
//         const error = await response.json();
//         console.error("Erro 404: ", error);
//         return;
//     }
//     else if(response.status === 500) {
//         const error = await response.json();
//         console.error("Erro 500: ", error);
//         alert(error.message);
//         return;
//     }
//     return await response.json();
// }

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
    // const qtdInputs = +qtdMeias.value;

    // console.log("qtdInputs = " +  qtdInputs)

    i =  qtdMeias - indexQtdMeias;

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

function validValueInputNumTicket(){
    const input = document.querySelector('input[type="number"]');
    const numMax = ifCheckboxFilled()

    console.log(numMax)

    if(!input) return;

    if(input.value > numMax) input.value = numMax;
    else if(input.value < 0) input.value = 0;
    
    openSectionIsHalf(input.value);
}
