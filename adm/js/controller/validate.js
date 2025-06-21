async function validateReserve(){
    const urlParams = new URLSearchParams(window.location.search);
    const reserveId = +urlParams.get("reserve");

    const response = await fetch(`${urlServer}/ticket/valid/${reserveId}`, {
        method: "PATCH",
        headers: {
            "Authorization" : `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })

    const data = await response.json();
    
    alert(data.message);

}