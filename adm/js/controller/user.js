//Load Users Function
async function loadUsers() {
    const response = await fetch("http://localhost:3000/user/all", {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    const data = await response.json();

    const listUser = document.getElementById("cards-list");
    listUser.innerHTML = "";

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

    //console.log(data);

    const users = data.users || [];

    //console.log(users);

    users.forEach(user =>{
        listUser.innerHTML += `
            <section class="card" id="${user.id}" tabindex="0" aria-label="${user.name} - ${user.cpf}; ID#${user.id}">
                <div aria-label="${user.name} ${user.cpf} ID#${user.id}">
                    <i aria-label="Ícone de usuário">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>  
                    </i>
                    <p title="${user.name} - ${user.cpf}">${user.name} - ${user.cpf}</p>
                    <p>ID#${user.id}</p>
                </div>
                <div>
                    <button onclick="goToReserves(this)">Reservas</button>
                    <button onclick="editUser(this)">Editar</button>
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
        deleteUser(card);
        closeModal("modal-confirm-delete");
    });
}

//Btn Add User Function
function addUser() {
   window.location.href = "../../adm/screens/register/register-user-client.html";
}

//Edit User Function
function editUser(btn) {
    const card = btn.closest(".card");
    const userId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/edit/edit-user-client.html?user=${userId}`;

}

//Go to Reserves of user

function goToReserves(btn){
    const card = btn.closest(".card");
    const userId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/reserves.html?user=${userId}`;
}

//Route Create User

async function createUser() {
    const form = document.getElementById("form-register-cliente");
    const user = {
        name: form.name.value,
        cpf: form.cpf.value,
        birthdate: form.birthdate.value,
        email: form.email.value,
        telNumber: form.telNumber.value,
        password: form.password.value
    }

    const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });

    
    if(response.status === 400) {
        const error = await response.json();
        console.error("Erro 400: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 401) {
        const error = await response.json();
        console.error("Erro 401: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "../../screens/users.html";
    
}

// preencher o formulário de edição com os dados do usuário
async function fillEditForm() {
    const user = await getUser();
    if (!user) return;

    const form = document.getElementById("form-edit-cliente");
    form.name.value = user.name;
    form.cpf.value = user.cpf;
    form.birthdate.value = user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : '';
    form.email.value = user.email;
    form.telNumber.value = user.telNumber;
}

// Função para atualizar o usuário
async function updateUser() {
    const form = document.getElementById("form-edit-cliente");
    const userData = await getUser();
    if (!user) return;
    const userId = userData.id;

    fillEditForm();

    const user = {
        name: form.name.value,
        cpf: form.cpf.value,
        birthdate: form.birthdate.value,
        email: form.email.value,
        telNumber: form.telNumber.value
    };

    const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "PUT",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(user)
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

    window.location.href = "../../screens/users.html";
}

//Delete User Function
async function deleteUser(btn) {
    const card = btn.closest(".card");
    const userId = +card.getAttribute("id");

    console.log("Deletando usuário com ID:", userId);
    

    const response = fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })

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