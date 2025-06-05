//Download ticket

async function downloadTicket(id){
   let url = "";
    try {
        url = await getDownloadUrlOfTicket(id);
   }
   catch(error){
        return console.error("Erro ao acessar ingresso:", error);
   }
   
   try {
        const response = await fetch(url);
        const blob = await response.blob();

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = url.split("/").pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(a.href);
    } catch (error) {
        return console.error("Erro ao baixar o ingresso:", error);
    }
}

//Acessar url de download de ingresso em servidor

async function getDownloadUrlOfTicket(id){
    //logica para buscar url

    return  "url";
}