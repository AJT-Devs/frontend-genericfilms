// Load reserves by reserve
async function loadReservesByUser(){
   const user = await getUser();
    if(!user) return;
    const userId = user.id;


    const response = await fetch(`http://localhost:3000/ticket/list/${userId}`,{
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    const data = await response.json();

    const listReserve = document.getElementById("cards-list");
    listReserve.innerHTML = "";

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

    header.innerHTML = `${user.name} - Reservas`;


    const reserves = data || [];

    // console.log(reserves);

    reserves.forEach(reserve =>{
        //console.log(reserve);

        const ticket = {
            id: reserve.id,
            isPCD: reserve.isPCD ? "(PCD)" : "",
            //isHalf: reserve.isHalf,
            seat : reserve.seat,
            typeReserve: reserve.typeReserve,
            startDate : reserve.startDate,
            startHour : reserve.startHour,
            endHour : reserve.endHour,
            //format : reserve.format,
            //language : reserve.language,
            //roomName : reserve.name,   
            cinemaName : reserve.cinemaName,
            //cinemaAddress : reserve.address,
            //cinemaCity : reserve.city,
            //cinemaUF : reserve.uf,
            movieTitle : reserve.movieTitle,
            //moviePoster : reserve.poster,
            //price: reserve.price,
            //qrcode: reserve.qrcode
        }

        //console.log("Ticket: ", ticket);

        listReserve.innerHTML += `
            <section class="card" id="${ticket.id}" tabindex="0" aria-label="${ticket.typeReserve} - ${ticket.seat} - ${ticket.startDate} - ${ticket.movieTitle} - ${ticket.cinemaName} - ${ticket.startHour} - ${ticket.endHour}; ID#${ticket.id}">
                <div aria-label="Reservas de ${user.name}; ID#${ticket.id}">
                    <i aria-label="Ícone de ingresso">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-reserve-icon lucide-reserve"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>    
                    </i>
                    <p title="${ticket.typeReserve} - ${ticket.seat} - ${ticket.startDate} - ${ticket.movieTitle} - ${ticket.cinemaName} - ${ticket.startHour} - ${ticket.endHour}">${ticket.typeReserve} - ${ticket.seat} - ${ticket.startDate} - ${ticket.movieTitle} - ${ticket.cinemaName} - ${ticket.startHour} - ${ticket.endHour}</p>
                    <p>ID#${ticket.id}</p>
                </div>
                <div>
                    <button onclick="goToReservePreview(this)">Acessar ingresso</button>
                    <button onclick="openModalConfirmDelete(this)">Deletar</button>
                </div>
            </section>
        `;
    })
    
}

function deleteReserve(card) {
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
    const userId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/edit/edit-reserve.html?id=${userId}`;

}

//Go to reserve preview

function goToReservePreview(btn){
    const card = btn.closest(".card");
    const ticketId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/preview-ticket.html?ticket=${ticketId}`;
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
    input.setAttribute('name', `docHalfPass#${i}`);
    input.setAttribute('aria-label', `Documento de meia entrada #${i}`);
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

    // console.log(numMax)

    if(!input) return;

    if(input.value > numMax) input.value = numMax;
    else if(input.value < 0) input.value = 0;
    
    openSectionIsHalf(input.value);
}
