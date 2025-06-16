//Load Users Function
async function loadUsers() {
    const response = await fetch("http://localhost:3000/user/all");
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

//Btn Add User Function
function addUser() {
   window.location.href = "../../adm/screens/register/register-user-client.html";
}

//Edit User Function
function editUser(btn) {
    const card = btn.closest(".card");
    const userId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/edit/edit-user-client.html?id=${userId}`;

}

//Go to Reserves of user

function goToReserves(btn){
    const card = btn.closest(".card");
    const userId = card.getAttribute("id");
  
    window.location.href = `../../adm/screens/reserves.html?id=${userId}`;
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
            "Content-Type": "application/json"
        },
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

// Get User Function
async function getUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if(!userId) return;

    // console.log("ID do usuário: ", userId);

    const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
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

    const data = await response.json();

    const user = data.user;

    // console.log(user);

    return user;
}

// Função para atualizar o usuário
// async function updateUser() {
//     const form = document.getElementById("form-edit-cliente");
//     const userId = new URLSearchParams(window.location.search).get("id");

//     const user = {
//         name: form.name.value,
//         cpf: form.cpf.value,
//         birthdate: form.birthdate.value,
//         email: form.email.value,
//         telNumber: form.telNumber.value
//     };

//     const response = await fetch(`http://localhost:3000/user/${userId}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//     });

//     if(response.status === 400) {
//         const error = await response.json();
//         console.error("Erro 400: ", error);
//         alert(error.message);
//         return;
//     }
//     else if(response.status === 404) {
//         const error = await response.json();
//         console.error("Erro 404: ", error);
//         alert(error.message);
//         return;
//     }
//     else if(response.status === 500) {
//         const error = await response.json();
//         console.error("Erro 500: ", error);
//         alert(error.message);
//         return;
//     }

//     window.location.href = "../../screens/users.html";
// }