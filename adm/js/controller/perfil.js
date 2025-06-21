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