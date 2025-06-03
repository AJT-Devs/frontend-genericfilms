//Search Function

function searchUser() {
    //Aqui será implementado o sistema de busca
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

//Get User Function

function getAllUsers() {
    const cardsList = document.getElementById("cards-list");
    // cardsList é a section onde os cards de User serão exibidos.
    // Aqui você pode adicionar a lógica para buscar os Users do banco de dados.
}

//Add User Function
function addUser() {
   window.location.href = "../../adm/screens/register/register-user.html";
}

//Edit User Function
function editUser(btn) {
    const card = btn.closest(".card");
    const userId = card.getAttribute("id");

    //Logica para saber tipo de usuário (cliente ou adm)
    const adm = false;
    // const clint = true;

    if(!adm){
        window.location.href = `../../adm/screens/edit/edit-user-client.html?id=${userId}`;
    }
    else window.location.href = `../../adm/screens/edit/edit-user-adm.html?id=${userId}`;

}

//Client and Adm choose form of Register and Edit

function clientChangeToAdmFormRegister(e){
    const main = document.getElementById('main-forms');
    const formClient = `
            <form action="" id="form-register-cliente">
                <label for="full-name">Nome Completo*</label>
                <input type="text" placeholder="Nome do cliente" id="full-name" title="[Nome do cliente]" oninput="enableBtnFooter()">
                
                <div class="div-group-inputs">
                    <div>
                        <label for="cpf">CPF*</label>
                        <input type="text" id="cpf" placeholder="000.000.000-00" oninput="enableBtnFooter()">
                    </div>
                    <div>
                        <label for="data-nasc">Data de Nascimento*</label>
                        <input type="text" placeholder="DD/MM/AAAA" id="data-nasc" oninput="enableBtnFooter()">
                    </div>
                </div>
                <div class="div-group-inputs">
                    <div>
                        <label for="email">E-mail*</label>
                        <input type="text" id="email" placeholder="Email do cliente" oninput="enableBtnFooter()">
                    </div>
                    <div>
                        <label for="tel">Telefone*</label>
                        <input type="text" placeholder="(00) 0000-0000" id="tel" oninput="enableBtnFooter()">
                    </div>
                </div>

                <label for="password">Senha*</label>
                <input type="password" id="password" placeholder="Senha do cliente" oninput="enableBtnFooter()">
            
            </form>
    `;
    const formAdm = `
       <form action="" id="form-register-adm">
                <label for="full-name-adm">Nome Completo*</label>
                <input type="text" placeholder="Nome do usuário" id="full-name-adm" title="[Nome do usuário]" oninput="enableBtnFooter()">
                
                <label for="email-adm">E-mail Corporativo*</label>
                <input type="text" id="email-adm" placeholder="Email do usuário" oninput="enableBtnFooter()">
                
                <label for="cargo">Cargo*</label>
                <input type="text" id="cargo" placeholder="Informe o cargo" oninput="enableBtnFooter()">

                <label for="password-adm">Senha*</label>
                <input type="password" id="password-adm" placeholder="Senha do usuário" oninput="enableBtnFooter()">
            
        </form> 
    `;
    const menu = e.closest("#menu-btn-type-users");

    if(e.value == "Administrador"){
        main.innerHTML = formAdm;
        e.style.backgroundColor = "#EDC526";
        menu.querySelector('button[value="Cliente"]').style.backgroundColor = "#FAFAFA";
    }
    else{
        main.innerHTML = formClient;
        e.style.backgroundColor = "#EDC526";
        menu.querySelector('button[value="Administrador"]').style.backgroundColor = "#FAFAFA";
    }

    document.getElementById('btn-footer').disabled = true;

}