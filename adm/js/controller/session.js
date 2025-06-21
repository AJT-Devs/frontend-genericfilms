async function loadSessions() {
    const cinema = await getCinema();
    if (!cinema) return;
    const room = await getRoom();
    if (!room) return;
    const roomId = +room.id;

    const response = await fetch(`${urlServer}/session/list/${roomId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();

    const listSession = document.getElementById("cards-list");
    listSession.innerHTML = "";

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

    const header = document.querySelector("#main-header h1");
    const title = document.querySelector("title");
    header.innerHTML = `${cinema.name} - Sala ${room.name} - Sessões`;
    title.innerHTML = `ADM - Sessões de ${room.name} de ${cinema.name}`;

    const sessions = data.sessions || [];

    for (const session of sessions) {

        const movie = await getMovieById(session.idMovie);


        const [datePart, timePart] = session.startDate.split("T");
        session.startTime = timePart.substring(0, 5).replace(":", "h");
        session.startDate = datePart.split("-").reverse().join("/");

        listSession.innerHTML += `
            <section class="card" id="${session.id}" tabindex="0" aria-label="Sessão em ${cinema.name}; do filme ${movie.tile}; em ${session.startDate} e ${session.startTime}; ID#${session.id}">
                <div aria-label="Sessão em ${cinema.name}; do filme ${movie.tile}; em ${session.startDate} e ${session.startTime}; ID#${session.id}">
                    <i aria-label="Ícone de pipoca">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-popcorn-icon lucide-popcorn"><path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"/><path d="M10 22 9 8"/><path d="m14 22 1-14"/><path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"/></svg>
                    </i>
                    <p title="${movie.title}- ${session.startDate} - [HH:MM]">${movie.title} - ${session.startDate} - ${session.startTime}</p>
                    <p>ID#${session.id}</p>
                </div>
                <div>
                    <button onclick="editSession(this)">Editar</button>
                    <button onclick="openModalConfirmDelete(this)">Deletar</button>
                </div>
            </section>
        `;
    }
}
//Delete Session Function

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

//Delete Session Function

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

function openModalConfirmDelete(btn) {
    const card = btn.closest(".card");
    const modal = document.getElementById("modal-confirm-delete");
    modal.closest(".area-modal").style.display = "flex";
    modal.style.display = "block";
    const btnConfirmDelete = modal.querySelector("#btn-confirm-delete");
    btnConfirmDelete.addEventListener("click", function () {
        deleteSession(card);
        closeModal("modal-confirm-delete");
    });
}

//Add Session Function
async function addSession() {
    const cinema = await getCinema();
    if (!cinema) return;
    const cinemaId = cinema.id;

    const room = await getRoom();
    const roomId = room.id;

    window.location.href = `../../adm/screens/register/register-session.html?cinema=${cinemaId}&room=${roomId}`;
}

async function fillEditForm() {
    const cinema = await getCinema();
    if (!cinema) return;

    const room = await getRoom();
    if (!room) return;

    const form = document.getElementById("form-edit-session");

    const session = await getSession();
    console.log(session);
    if (!session) return;

    const sessionId = session.id;
    const movies = await getAllMovies();
    const movieId = +session.idMovie;

    form.cinema.value = cinema.name;
    form.room.value = "Sala " + room.name;
    form.startDate.value = session.startDate ? new Date(session.startDate).toISOString().split('T')[0] : '';
    form.timeStart.value = session.startDate ? session.startDate.split("T")[1].substring(0, 5) : '';
    form.timeEnd.value = session.endHour ? session.endHour.split("T")[1].substring(0, 5) : '';
    form.price.value = session.price ? `R$ ${session.price.replace('.', ',')}` : '';
    form.selectFormat.value = session.format || '';
    form.selectLanguage.value = session.language || '';

    const selectMovie = document.getElementById("select-movie");

    movies.forEach(movie => {
        if (movie.id === movieId) {
            selectMovie.innerHTML += `
            <option value="${movie.id}" selected>${movie.title}</option>
            `;
        } else {
            selectMovie.innerHTML += `
            <option value="${movie.id}">${movie.title}</option>
        `;
        }
    });
}

//Edit Session Function
async function editSession(btn) {
    const card = btn.closest(".card");
    const sessionId = card.getAttribute("id");

    const cinema = await getCinema();
    if (!cinema) return;
    const cinemaId = cinema.id;

    const room = await getRoom();
    const roomId = room.id;

    console.log(card, sessionId);

    window.location.href = `../../adm/screens/edit/edit-session.html?cinema=${cinemaId}&room=${roomId}&session=${sessionId}`;
}

async function createSession() {
    const room = await getRoom();
    if (!room) return;

    const form = document.getElementById("form-register-session");

    const startDate = new Date(form.startDate.value).toISOString().split('T')[0] + "T" + form.timeStart.value + ":00.000Z";
    const endHour = new Date(form.startDate.value).toISOString().split('T')[0] + "T" + form.timeEnd.value + ":00.000Z";

    const sessionData = {
        idRoom: +room.id,
        idMovie: +form.selectMovie.value,
        startDate: startDate,
        endHour: endHour,
        price: +form.price.value.replace('R$', '').replace(',', '.').trim(),
        format: form.selectFormat.value,
        language: form.selectLanguage.value,
    };

    const response = await fetch(`${urlServer}/session/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionData),
        credentials: 'include'
    });
    if (response.status === 400) {
        const error = await response.json();
        console.error("Erro 400: ", error);
        alert(error.message);
        return;
    }
    if (response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }

    alert("Sessão criada com sucesso!");
    window.location.href = `../../screens/sessions.html?cinema=${room.idCinema}&room=${room.id}`;

}

async function updateSession() {
    const form = document.getElementById("form-edit-session");
    const session = await getSession();

    const startDate = new Date(form.startDate.value).toISOString().split('T')[0] + "T" + form.timeStart.value + ":00.000Z";
    const endHour = new Date(form.startDate.value).toISOString().split('T')[0] + "T" + form.timeEnd.value + ":00.000Z";

    const sessionData = {
        idRoom: session.idRoom,
        idMovie: +form.selectMovie.value,
        startDate: startDate,
        endHour: endHour,
        price: +form.price.value.replace('R$', '').replace(',', '.').trim(),
        format: form.selectFormat.value,
        language: form.selectLanguage.value,
    };

    const response = await fetch(`${urlServer}/session/${session.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionData),
        credentials: 'include'
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

    alert("Sessão atualizada com sucesso!");
    const cinema = await getCinema();
    if (!cinema) return;
    window.location.href = `../../screens/sessions.html?cinema=${cinema.id}&room=${session.idRoom}`;

}

async function loadRegisterMovies() {
    const cinema = await getCinema();
    if (!cinema) return;

    const movies = await getAllMovies();
    if (!movies) return;

    const room = await getRoom();
    if (!room) return;

    const inputCinemaName = document.querySelector("#cinema");
    const inputRoomName = document.querySelector("#room");
    inputCinemaName.value = cinema.name;
    inputRoomName.value = "Sala " + room.name;

    const selectMovie = document.getElementById("select-movie");

    movies.forEach(movie => {
        selectMovie.innerHTML += `
        <option value="${movie.id}">${movie.title}</option>
        `;
    });
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


async function deleteSession(card) {
    const sessionId = card.getAttribute("id");
    const response = fetch(`${urlServer}/session/${+sessionId}`, {
        method: "DELETE",
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
    card.remove();
}