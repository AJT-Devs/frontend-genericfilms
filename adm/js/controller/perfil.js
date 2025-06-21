async function loadProfile(){
    const adminId = localStorage.getItem("admId");
    const response = await fetch(`${urlServer}/admin/${+adminId}`, {
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
    if(response.status === 500) {
        const error = await response.json();
        console.error("Erro 500: ", error);
        alert(error.message);
        return;
    }

    const data = await response.json();
    const admin = data.admin;



    const profile = document.getElementById("profileData");
    profile.name.value = admin.name;
    profile.email.value = admin.email;
    
}

async function changePassword(){
    const adminId = localStorage.getItem("admId");
    const form = document.querySelector("#form-change-password");
    const password = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    
    const data = {
        password,
        newPassword
    }

    console.log("Dados enviados: ", data);
    const response = await fetch(`${urlServer}/admin/${+adminId}`, {
        method: "PATCH",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if(response.status !== 200) {
        const error = await response.json();
        console.error("Erro: ", error);
        alert(error.message);
        return;
    }
    alert("Senha alterada com sucesso!");

    window.location.href = "../../adm/screens/perfil.html";
}

async function logoutAdmin(){
    const response = await fetch(`${urlServer}/admin/logout`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });

    if(response.status !== 200) {
        const error = await response.json();
        console.error("Erro: ", error);
        alert(error.message);
        return;
    }

    alert("Logout realizado com sucesso!");
    localStorage.removeItem("admId");
    localStorage.removeItem("admToken");
    localStorage.removeItem("admName");
    window.location.href = "../../adm/";

}