// Function loadAdmins

async function loadAdmins() {
    const response = await fetch("http://localhost:3000/admin/list");
    const data = await response.json();

    const listAdmin = document.getElementById("cards-list");
    listAdmin.innerHTML = "";

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

    const admins = data.admins || [];

    admins.forEach(admin =>{
        listAdmin.innerHTML += `
           <section class="card" id="${admin.id}" tabindex="0" aria-label="${admin.name} - ${admin.cargo}; ID#${admin.id}">
                <div aria-label="${admin.name} - ${admin.cargo}; ID#${admin.id}">
                    <i aria-label="Ícone de usuário">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-Admin-round-icon lucide-circle-Admin-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>  
                    </i>
                    <p title="${admin.name} - ${admin.cargo}">${admin.name} - ${admin.cargo}</p>
                    <p>ID#${admin.id}</p>
                </div>
                <div>
                    <button onclick="editAdmin(this)">Editar</button>
                    <button onclick="openModalConfirmDelete(this)">Deletar</button>
                    <button onclick="testMessage()">Teste mensagem</button>
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
        deleteAdmin(card);
        closeModal("modal-confirm-delete");
    });
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

async function createAdmin() {
    const form = document.getElementById("form-register-adm");
    const admin = {
        name: form.name.value,
        email: form.email.value,
        cargo: form.cargo.value,
        password: form.password.value
    }

    const response = await fetch("http://localhost:3000/admin/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(admin)
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

    alert("Administrador cadastrado com sucesso!");
    //window.location.href = "../../screens/admins.html";
    
}

async function updadeAdmin(){
    const admin = await getAdmin();
    if(!admin) return;
    const form = document.getElementById("form-edit-adm");
    const updatedAdmin = {
        name: form.name.value || admin.name,
        email: form.email.value || admin.email,
        cargo: form.cargo.value || admin.cargo,
        password: form.password.value || admin.password
    }

    const response = await fetch(`http://localhost:3000/admin/${admin.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedAdmin)
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

    alert("Administrador atualizado com sucesso!");
    window.location.href = "../../screens/admins.html";
    
}

async function fillEditForm(){
    const admin = await getAdmin();
    if(!admin) return;

    // console.log("Admin encontrado: ", admin);

    const form = document.getElementById("form-edit-adm");
    if(!form) return;

    form.name.value = admin.name;
    form.email.value = admin.email;
    form.cargo.value = admin.cargo;
}

async function getAdmin() {
    const urlParams = new URLSearchParams(window.location.search);
    const adminId = urlParams.get("id");
    
    // console.log("ID do usuário: ", adminId);

    if(!adminId) return;


    // console.log("ID do usuário: ", adminId);

    const response = await fetch(`http://localhost:3000/admin/${adminId}`);
    
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

    const admin = data.admin;

    // console.log(user);

    return admin;
}

//Delete Admin Function

async function deleteAdmin(card) {
    
    const adminId = card.getAttribute("id");
    
    const response = fetch(`http://localhost:3000/admin/${adminId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
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