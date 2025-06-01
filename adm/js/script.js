//Main

function isLogin(){
    // Adicionar verificação se é um adm logado, se não redirecionar para a página de login
}

function openSearch() {
    const header = document.getElementById("main-header");
    const search = document.getElementById("main-header-search");
    const h2Search = document.getElementById("h2-search");

    header.style.display = "none";
    search.style.display = "flex";
    h2Search.style.display = "block";
}

function closeSearch() {
    const header = document.getElementById("main-header");
    const search = document.getElementById("main-header-search");
    const h2Search = document.getElementById("h2-search");

    header.style.display = "flex";
    search.style.display = "none";
    h2Search.style.display = "none";
}

function closeModal(id) {
    const modal = document.getElementById(id);
        modal.closest(".area-modal").style.display = "none";
}