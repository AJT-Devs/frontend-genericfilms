async function loadMovies() {
    const response = await fetch("http://localhost:3000/movie/list");
    const data = await response.json();

    const listMovie = document.getElementById("cards-list");
    listMovie.innerHTML = "";

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

    const movies = data.movies || [];

    //console.log(movies);

    movies.forEach(movie =>{
        listMovie.innerHTML += `
            <section class="card" id="${movie.id}" tabindex="0" aria-label="${movie.title}; ID#${movie.id}">
                <div aria-label="${movie.title}; ID#${movie.id}">
                    <i aria-label="Ícone de filme">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-film-icon lucide-film"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>  
                    </i>
                    <p title="${movie.title}">${movie.title}</p>
                    <p>ID#${movie.id}</p>
                </div>
                <div>
                    <button onclick="editMovie(this)">Editar</button>
                    <button onclick="openModalConfirmDelete(this)">Deletar</button>
                </div>
            </section>
        `;
    })

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