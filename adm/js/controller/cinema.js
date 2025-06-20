//Load Cinemas Function
async function loadCinemas() {
    const response = await fetch("http://localhost:3000/cinema/list", {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    const data = await response.json();

    const listCinema = document.getElementById("cards-list");
    listCinema.innerHTML = "";

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

    const cinemas = data || [];

    cinemas.forEach(cinema =>{
        listCinema.innerHTML += `
            <section class="card" id="${cinema.id}" tabindex="0" aria-label="${cinema.name}; ID#${cinema.id}">
                <div aria-label="${cinema.name}; ID#${cinema.id}">
                    <i aria-label="Ícone de localização">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                    </i>
                    <p title="${cinema.name}">${cinema.name}</p>
                    <p>ID#${cinema.id}</p>
                </div>
                <div>
                    <button class="btn-go-rooms" onclick="goToRooms(this)">Salas</button>
                    <button onclick="editCinema(this)">Editar</button>
                    <button onclick="openModalConfirmDelete(this)">Deletar</button>
                </div>
            </section>
        `;
    })

}

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    modal.style.display = "block";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function() {
        deleteCinema(card);
        closeModal("modal-confirm-delete");
    });
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

    window.location.href = `../../adm/screens/edit/edit-cinema.html?cinema=${cinemaId}`;
}

//Ir para Salas do cinema

function goToRooms(btn) {
    const card = btn.closest(".card");
    const cinemaId = card.getAttribute("id");
    
    console.log(card, cinemaId);

    window.location.href = `../../adm/screens/rooms.html?cinema=${cinemaId}`;
}

//Route Create Cinema
async function createCinema() {
    const form = document.getElementById("form-register-cinema");
    const cinema = {
        name: form.localization.value,
        uf: form.uf.value,
        address: form.address.value,
        city: form.city.value
    }

    const response = await fetch("http://localhost:3000/cinema/create", {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(cinema)
    });

    if(response.status === 400) {
        const error = await response.json();
        console.error("Erro 400: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }
    
    alert("Cinema cadastrado com sucesso!");
    window.location.href = "../../screens/cinemas.html";
}

// preencher o formulário de edição com os dados de cinema
async function fillEditForm() {
    const cinema = await getCinema();
    if (!cinema) return;

    // console.log(cinema);

    const form = document.getElementById("form-edit-cinema");
    form.localization.value = cinema.name;
    form.uf.value = cinema.uf;
    form.address.value = cinema.address;
    form.city.value = cinema.city;
}

// Update Cinema Function

async function updateCinema() {
    const form = document.getElementById("form-edit-cinema");
    const urlParams = new URLSearchParams(window.location.search);
    const cinemaId = urlParams.get("id");
    const cinema = {
        name: form.localization.value,
        uf: form.uf.value,
        address: form.address.value,
        city: form.city.value
    }

    const response = await fetch(`http://localhost:3000/cinema/${cinemaId}`, {
        method: "PUT",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(cinema)
    });

    if(response.status === 400) {
        const error = await response.json();
        console.error("Erro 400: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 404) {
        const error = await response.json();
        console.error("Erro 404: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }

    alert("Cinema atualizado com sucesso!");
    window.location.href = "../../screens/cinemas.html";
}

//Delete Cinema Function

async function deleteCinema(card) {
    const cinemaId = card.getAttribute("id");

    const response = await fetch(`http://localhost:3000/cinema/${cinemaId}`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });

    if(response.status === 404) {
        const error = await response.json();
        console.error("Erro 404: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }

    card.remove();
}