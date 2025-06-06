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
    
    // console.log(card, movieId);

    window.location.href = `../../adm/screens/edit/edit-movie.html?id=${movieId}`;
}

function onDrag(label) {
    label.classList.add("drag-input-file");
    
}
function offDrag(label) {
    label.classList.remove("drag-input-file");
}

function showImagePreview(input) {
    const file = input.files[0];
    const preview = document.querySelector(`label[for="${input.id}"]`);
    preview.querySelector("span").style.display = "inline";

    const formats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const type = file ? file.type : "";
    if(!formats.includes(type)) {
        alert("Formato de imagem inválido. Por favor, envie uma imagem JPEG, PNG, JPG ou WEBP.");
        //futuro modal que vai surgir com a mensagem de erro
        input.value = "";
        preview.style.backgroundImage = "none";
        return;
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);

        preview.querySelector("span").style.display = "none";
    } else {
        preview.style.backgroundImage = "none";
    }
}