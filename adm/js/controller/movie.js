//Search Function

function searchMovie() {
    //Aqui será implementado o sistema de busca
}

//Delete Movie Function

function deleteMovie(card) {
    // Aqui você pode adicionar a lógica para remover o item do banco de dados.
    card.remove();
}

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function() {
        deleteMovie(card);
        closeModal("modal-confirm-delete");
    });
}

//Get Movie Function

function getAllMovies() {
    const cardsList = document.getElementById("cards-list");
    // cardsList é a section onde os cards de Movie serão exibidos.
    // Aqui você pode adicionar a lógica para buscar os Movies do banco de dados.
}

//Add Movie Function
function addMovie() {
   window.location.href = "../../adm/screens/register/register-movie.html";
}

//Edit Movie Function
function editMovie(btn) {
    const card = btn.closest(".card");
    const movieId = card.getAttribute("id");
    
    console.log(card, movieId);

    window.location.href = `../../adm/screens/edit/edit-movie.html?id=${movieId}`;
}