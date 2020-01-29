document.addEventListener("DOMContentLoaded", () => {
    const base64 = btoa(`${Client_ID +":"+ Client_Secret}`) 
    let auth = `basic ${base64}`;
    fetch('https://accounts.spotify.com/api/token', {
        method: 'post',
        body: "grant_type=client_credentials",
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res => res.json())
    .then(json => {
    let accessToken = "Bearer "+ json.access_token;
        fetch('https://api.spotify.com/v1/browse/featured-playlists', {
            method: 'get',
            headers: {
                'Authorization': accessToken,
            }
        })
        .then(res => res.json())
        .then(function(data){
            console.log(data)
            
            const produkt_array = data.playlists.items
            const mainElement = document.querySelector(".background_pic")
            produkt_array.forEach(element => {
                mainElement.innerHTML +=`
                <img src="${element.images[0].url}" alt="">                
                `
            })             
        })
        .catch((error) => {
            console.error(error)
        })
    });
});