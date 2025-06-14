//Main

function isLogin() {
    // Adicionar verificação se é um adm logado, se não redirecionar para a página de login

}

function renderHeader() {
  
}

function openSearch() {
    const header = document.getElementById("btns-main-header");
    const search = document.getElementById("search-bar");
    const h2Search = document.getElementById("h2-search");

    header.style.display = "none";
    search.style.display = "flex";
    h2Search.style.display = "block";
}

function search() {
    const searchInput = document.querySelector('input[type="search"]');
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(card => {
        const p = card.querySelectorAll('p');
        const cardText = Array.from(p).map(el => el.textContent.toLowerCase()).join(" ");
        if (cardText.includes(searchTerm)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
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

function goToBack() {

    // if (document.referrer == (origin + "/adm/screens/edit/change-password.html")) {
    //     window.history.go(-3);
    // }

     window.history.back();
}

//Go to start

function goToStart() {

    //pagina inicial do usuario adm
    window.location.href = origin + "/adm/screens/cinemas.html"
}

//Perfil ADM

//Go to change password

function goToChangePasswordAdm() {
    window.location.href = origin + "/adm/screens/edit/change-password.html"
}

// Função que verifica todo o formulário e habilita/desabilita o botão

function checkFormStatus() {
  const inputsFilled = isInputsFilled();
  const selectsFilled = isSelectsFilled();
  const textareaFilled = isTextareaFilled();
  const repeatPasswordOk = compareRepeatPassword();
  const checkboxFilled = ifCheckboxFilled();
  
  const btn = document.getElementById('btn-footer');
  if(btn){
    btn.disabled = !(inputsFilled && selectsFilled && textareaFilled && repeatPasswordOk && checkboxFilled);
  }
}

// Função que verifica se todos os inputs obrigatórios estão preenchidos

function isInputsFilled() {
  const inputs = Array.from(document.querySelectorAll('input'));
  
  return inputs.every(input =>
    input.required ? input.value.trim() !== '' : true
  );
}

// Função que verifica se todos os selects obrigatórios estão preenchidos

function isSelectsFilled() {
  const selects = Array.from(document.querySelectorAll('select'));
  
  return selects.every(select => select.required ? select.value.trim() !== '' : true
  );
}

// Função que verifica se todos os textarea obrigatórios estão preenchidos

function isTextareaFilled() {
  const textareas = Array.from(document.querySelectorAll('textarea'));
  
  return textareas.every(textarea =>
    textarea.required ? textarea.value.trim() !== '' : true
  );
}

// Função que verifica se todos os inputs checkbox

function ifCheckboxFilled() {
  const checkboxes = Array.from(document.querySelectorAll('.div-map-seats input[type="checkbox"]'));

  if (checkboxes.length === 0) return true;

  const marked = checkboxes.filter(cb => cb.checked).length;
  
  // deve ter pelo menos um marcado
  return marked > 0 ? marked : 0;
}

// Função para comparar os campos de senha e repetir senha

function compareRepeatPassword() {
  const password = document.getElementById('password');
  const repeatPassword = document.getElementById('repeat-password');
  const message = document.getElementById('message-error-repeat-password');
  
  if (repeatPassword && password) {
    if (repeatPassword.value !== password.value) {
      repeatPassword.style.border = "2px solid #EDC526";
      message.style.display = "inline";
      return false;
    } 
    else {
      repeatPassword.style.border = "2px solid #3D3D3D";
      message.style.display = "none";
      return true;
    }
  }
  return true;
}

// Função que adiciona os event listeners a todos os inputs e selects do formulário

function enableBtnFooter() {
  checkFormStatus();

  const inputs = Array.from(document.querySelectorAll('input'));
  if(inputs){
    inputs.forEach(input => {
      input.addEventListener('input', checkFormStatus);
    });
  }

  const checkboxes = Array.from(document.querySelectorAll('.div-map-seats input[type="checkbox"]'));
  if(checkboxes){
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('input', ()=>{
        const marked = checkboxes.filter(cb => cb.checked).length;
        if(marked > 10){
          checkbox.checked = false;
        }
        checkFormStatus();
      });
    });
  }
  const selects = Array.from(document.querySelectorAll('select'));
  if(selects){
    selects.forEach(select => {
      select.addEventListener('change', checkFormStatus);
    });
  }
  const textareas = Array.from(document.querySelectorAll('textarea'));
  if(textareas){
    textareas.forEach(textarea => {
      textarea.addEventListener('input', checkFormStatus);
    });
  }
}

document.addEventListener('DOMContentLoaded', enableBtnFooter);

function clickBtnFooter() {

    //Logica de enviar alteração

    // console.log(window.location.href);

    if (document.querySelector('title').textContent === "ADM - Login") {
        window.location.href = origin + "/adm/screens/cinemas.html";
    }
    else window.history.back();
}


// Funções que reconhecem os inputs do tipo file e exibem o nome e a imagem do arquivo dentro do input

