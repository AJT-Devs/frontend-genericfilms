//Main

function isLogin(){
    // Adicionar verificação se é um adm logado, se não redirecionar para a página de login
}

function openSearch() {
    const header = document.getElementById("btns-main-header");
    const search = document.getElementById("search-bar");
    const h2Search = document.getElementById("h2-search");

    header.style.display = "none";
    search.style.display = "flex";
    h2Search.style.display = "block";
}

function closeSearch() {
    const header = document.getElementById("btns-main-header");
    const search = document.getElementById("search-bar");
    const h2Search = document.getElementById("h2-search");

    header.style.display = "flex";
    search.style.display = "none";
    h2Search.style.display = "none";
}

function closeModal(id) {
    const modal = document.getElementById(id);
        modal.closest(".area-modal").style.display = "none";
}

// Go to back

const origin = window.location.origin;

function goToBack(){

    if(document.referrer == (origin + "/adm/screens/edit/change-password.html")) {
        window.history.go(-3);
    }
    
    else window.history.back();
}

//Go to start

function goToStart(){

    //pagina inicial do usuario adm
    window.location.href = origin + "/adm/screens/cinemas.html"
}

//Perfil ADM

//Go to change password

function goToChangePasswordAdm(){
    window.location.href =  origin +"/adm/screens/edit/change-password.html"
}

//Enable btn Alterar senha

function enableBtnFooter(){
    const btn = document.getElementById('btn-footer');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeat-password');
    const message = document.getElementById('message-error-repeat-password');
    btn.disabled = true;

    const inputs = Array.from(document.querySelectorAll('input'));

    inputs.forEach(input => {

        input.addEventListener('input', ()=>{
            let todosPreenchidos = inputs.every(input => input.value.trim() !== "");
            if(input.id === 'repeat-password') {
                if(repeatPassword.value !== password.value){
                repeatPassword.style.border = "2px solid #EDC526"
                message.style.display = "inline";

                }
                else{
                    repeatPassword.style.border = "2px solid #3D3D3D"
                    message.style.display = "none";
                    btn.disabled = !todosPreenchidos;
                }
            }
        });
      });

    // console.log(inputs)
}

// repeat password

function compareRepeatPassword(){
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeat-password');
    const message = document.getElementById('message-error-repeat-password');
    const btn = document.getElementById('btn-footer');
    btn.disabled = true;

    if(repeatPassword.value !== password.value){
        repeatPassword.style.border = "2px solid #EDC526"
        message.style.display = "inline";

    }
    else{
        repeatPassword.style.border = "2px solid #3D3D3D"
        message.style.display = "none";

    }
}

enableBtnFooter();

//Change Password

function confirmChangePassword(){
    //Logica de enviar alteração

    window.location.href = "http://127.0.0.1:5500/adm/screens/perfil.html"
}