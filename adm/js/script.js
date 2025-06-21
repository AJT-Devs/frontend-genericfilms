const urlServer = "http://localhost:3000";

//Main

async function isLogin() {
    // Adicionar verificação se é um adm logado, se não redirecionar para a página de login
    const token = getToken();
    const name = getNameAdmin();
    if (!token) {
      if(!window.location.href.includes(origin + "/adm")){
        window.location.href = origin + "/adm";
      }
    }

    const response = await fetch(`${urlServer}/admin/alreadyLoggedAdmin`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  
  if(response.status !== 200) {
    if(!window.location.href.includes(origin + "/adm")){
      window.location.href = origin + "/adm";
    }
  }
  
  const aHeader = document.querySelector(".perfil");
  if(!aHeader) return;

  aHeader.textContent = name;
  aHeader.ariaLabel = `Clique para acessar usuário de ${name}`;
    
}

async function alreadyLogged() {
    // Adicionar verificação se é um adm logado, se sim redirecionar para a página inicial do adm
  const token = localStorage.getItem('admToken');
  if (token) {
    const response = await fetch(`${urlServer}/admin/alreadyLoggedAdmin`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  

  const data = await response.json();
  if (data.message === "Administrador já está logado!"){
    goToStart();
  }
  }
  
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
    modal.style.display = "none";

    if(id == "modal-message") modal.remove();
}

function openModalMessage(data){

  //data = {title: erro ou sucessos, message: mensagem, error: erro especifico caso exista}

  const message = {
    title: data.title,
    message: data.message,
    error: data.error ? "Error: " + data.error : ""
  };

  const modalArea = document.querySelector('.area-modal');
  const modal = `
    <section class="modal" id="modal-message">
        <h3>${message.title}</h3>
        <p>${message.message}</p>
        </br>
        <p><i>${message.error}</i></p>
        <div>
            <button>Ok</button>
        </div>
    </section>
  `;

  modalArea.style.display = "flex";
  modalArea.innerHTML += modal;
  const modalMessage = document.getElementById('modal-message');
  modalMessage.style.display = "block"

  return new Promise(resolve => {
    modalMessage.querySelector('button').addEventListener('click', ()=>{
      closeModal('modal-message');
      resolve(true);
    })
  })
}


async function testMessage(){
  const mensagem = await openModalMessage({title: 'Erro', message: 'Isso é apenas uma mensagem de teste',error: 'CPF não cadastrado'})
  console.log(mensagem)
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

async function checkFormStatus() {
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

// Função para realizar login administrador
async function loginAdm() {
  const form = document.getElementById('form-login-adm');

  if(!form) return;

  const loginData = {
    email: form.email.value,
    password: form.password.value
  };

  const response = await fetch(`${urlServer}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(loginData)
  });

  if (response.status === 400) {
    const error = await response.json();
    console.error("Erro 400: ", error);
    alert(error.message);
    return;
  }
  else if (response.status === 404) {
    const error = await response.json();
    console.error("Erro 404: ", error);
    alert(error.message);
    return;
  }
  else if (response.status === 500) {
    const error = await response.json();
    console.error("Erro 500: ", error);
    alert(error.message);
    return;
  }

  const data = await response.json();

  const token = data.token;

  const idAdmin = data.id;

  const nameAdmin = data.name;
  

  if (!token) return alert("Token não encontrado. Verifique se o servidor está funcionando corretamente.");

  console.log("Token: ", response);

  localStorage.setItem('admToken', token);
  localStorage.setItem('admName', nameAdmin);
  localStorage.setItem('admId', idAdmin);

  window.location.href = origin + "/adm/screens/cinemas.html";
}

//Gets

function getToken() {
    const token = localStorage.getItem('admToken');
    if (!token) {
        console.error("Token não encontrado. Verifique se o usuário está logado.");
        return null;
    }
    return token;
}
function getNameAdmin() {
    const name = localStorage.getItem('admName');
    if (!name) {
        console.error("Nome não encontrado. Verifique se o usuário está logado.");
        return null;
    }
    return name;
}

//Get Cinema

async function getCinema() {
    const urlParams = new URLSearchParams(window.location.search);
    const cinemaId = urlParams.get("cinema");

    if(!cinemaId) return;

    // console.log("ID do usuário: ", cinemaId);

    const response = await fetch(`${urlServer}/cinema/${cinemaId}`, {
        method: "GET",
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

    const data = await response.json();

    const cinema = data.cinema;

    // console.log(cinema);

    return cinema;
}

async function getAllCinemas(){
    const response = await fetch(`${urlServer}/cinema/list`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });

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

    const data = await response.json();

    const cinemas = data || [];

    return cinemas;
}

//Get Room

async function getRoom() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("room");

    if(!roomId) return;

    const Response = await fetch(`${urlServer}/room/${roomId}`,{
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    const data = await Response.json();
    const room = data.room;

    if(Response.status === 500) {
        const error = await Response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }
    else if(Response.status === 404) {
        const error = await Response.json();
        console.error("Erro 404: ", error);
        alert(error.message);
        return;
    }

    return room;
}

// Get User Function
async function getUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");

    if(!userId) return;

    // console.log("ID do usuário: ", userId);

    const response = await fetch(`${urlServer}/user/${userId}`, {
        method: "GET",
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

    const data = await response.json();

    const user = data.user;

    // console.log(user);

    return user;
}

async function getAdmin() {
    const urlParams = new URLSearchParams(window.location.search);
    const adminId = urlParams.get("admin");
    
    // console.log("ID do usuário: ", adminId);

    if(!adminId) return;


    // console.log("ID do usuário: ", adminId);

    const response = await fetch(`${urlServer}/admin/${adminId}`, {
        method: "GET",
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

    const data = await response.json();

    const admin = data.admin;

    // console.log(user);

    return admin;
}

async function getMovie() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = +urlParams.get("movie");


    if(!movieId) {
        alert("ID do filme não encontrado.");
        return;
    }

    const response = await fetch(`${urlServer}/movie/${movieId}`, {
        method: "GET",
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

    const data = await response.json();

    // console.log(data.movie);

    return data.movie;
}

async function getMovieById(movieId) {
    if (!movieId) {
        alert("ID do filme não encontrado.");
        return;
    }

    const response = await fetch(`${urlServer}/movie/${movieId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });

    if (response.status === 404) {
        const error = await response.json();
        console.error("Erro 404: ", error);
        alert(error.message);
        return;
    }
    else if (response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }

    const data = await response.json();

    // console.log(data.movie);

    return data.movie;
}

async function getAllMovies() {
    const response = await fetch(`${urlServer}/movie/list`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    const data = await response.json();

    if (response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }
    else if (response.status === 404) {
        const error = await response.json();
        console.error("Erro 404: ", error);
    }

    const movies = data.movies || [];

    return movies;
}

async function getSession() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = +urlParams.get("session");

    if(!sessionId) {
        alert("ID da sessão não encontrado.");
        return;
    }

    const response = await fetch(`${urlServer}/session/${sessionId}`, {
        method: "GET",
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

    const data = await response.json();

    // console.log(data.session);

    return data.session;
}

document.addEventListener("DOMContentLoaded", isLogin);