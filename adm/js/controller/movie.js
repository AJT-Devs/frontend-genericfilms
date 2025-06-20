async function loadMovies() {
    const response = await fetch("http://localhost:3000/movie/list",{
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
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

function openModalConfirmDelete(btn){
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    modal.style.display = "block";
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

    window.location.href = `../../adm/screens/edit/edit-movie.html?movie=${movieId}`;
}

async function fillEditForm(){
    const movie = await getMovie();
    if(!movie) return;
    
    const form = document.getElementById("form-edit-movie");
    console.log(form.titleMovie);

    form.title.value = movie.title;
    form.resume.value = movie.synopsis;
    form.linkTrailer.value = movie.trailer;
    form.gender.value = movie.gender;
    form.classification.value = movie.classification;
    form.releaseDate.value = movie.releaseDate;
    form.duration.value = movie.duration;
    form.director.value = movie.director;
    form.cast.value = movie.cast;
    // form.status.value = movie.status;

    showPreviewImageOfBD(form.posterMovie, movie.poster);
    showPreviewImageOfBD(form.bannerMovie, movie.banner);
}

async function getMovie() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = +urlParams.get("movie");


    if(!movieId) {
        alert("ID do filme não encontrado.");
        return;
    }

    const response = await fetch(`http://localhost:3000/movie/${movieId}`, {
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

    console.log(data.movie);

    return data.movie;
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

function showPreviewImageOfBD(input, url){
    const preview = document.querySelector(`label[for="${input.id}"]`);
    preview.querySelector("span").style.display = "inline";

    if (url) {
        preview.style.backgroundImage = `url(${url})`;

        preview.querySelector("span").style.display = "none";
    } else {
        preview.style.backgroundImage = "none";
    }
}

//Router create movie

function ativarSubmitDoForm() {
    const form = document.getElementById("form-register-movie");

    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        createMovie(event);
    });

    form.requestSubmit();
}

async function createMovie(formData) {
    const form = document.getElementById("form-register-movie");
    // const movie =  {
    //     title: form.title.value,
    //     synopsis: form.synopsis.value,
    //     trailer: form.trailer.value,
    //     gender: form.gender.value,
    //     classification: form.classification.value,
    //     releaseDate: form.releaseDate.value,
    //     duration: form.duration.value,
    //     director: form.director.value,
    //     cast: form.cast.value,
    //     poster: form.poster.files[0] ? await convertFileToUrl(form.poster.files[0]) : null,
    //     banner: form.banner.files[0] ? await convertFileToUrl(form.banner.files[0]) : null
    // }

    console.log(formData)

    

    // formData.append("title", movie.title);
    // formData.append("synopsis", movie.synopsis);
    // formData.append("trailer", movie.trailer);
    // formData.append("gender", movie.gender);
    // formData.append("classification", movie.classification);
    // formData.append("releaseDate", movie.releaseDate);
    // formData.append("duration", movie.duration);
    // formData.append("director", movie.director);
    // formData.append("cast", movie.cast);
    // formData.append("poster", movie.poster);
    // formData.append("banner", movie.banner);
    
    // console.log(movie);


    const response = await fetch("http://localhost:3000/movie/", {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            // "Content-Type": "application/json"
        },
        credentials: 'include',
        body: formData
    });

    console.log(JSON.stringify(formData));

    if(response.status === 400) {
        const error = await response.json();
        console.error("Erro 400: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }
    else if(response.status === 404) {
        const error = await response.json();
        console.error("Erro 404: ", error);
        alert(error.message);
        return;
    }
    
    alert("Filme cadastrada com sucesso!");
    //window.location.href = `../../screens/movies.html`;
}

// Função de conversão do arquivo para Base64
async function convertFileToUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

//Router update movie
async function updateMovie() {
    const movie = await getMovie();
    if(!movie) return;
    const movieId = movie.id;

    const form = document.getElementById("form-edit-movie");
    const updatedMovie = {
        title: form.title.value,
        synopsis: form.synopsis.value,
        trailer: form.trailer.value,
        gender: form.gender.value,
        classification: form.classification.value,
        releaseDate: form.releaseDate.value,
        duration: form.duration.value,
        //status: form.status.value,
        director: form.director.value,
        cast: form.cast.value,
        poster: form.poster.value,
        banner: form.banner.value
    }

    const response = await fetch(`http://localhost:3000/movie/put/${movieId}`, {
        method: "PUT",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
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

    alert("Filmes atualizado com sucesso!");
    window.location.href = `../../screens/movies.html`;
}

//Delete Movie Function

async function deleteMovie(card) {
    const movieId = card.getAttribute("id");

    const response = fetch(`http://localhost:3000/movie/${+movieId}`, {
        method: "DELETE",
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

    card.remove();
}