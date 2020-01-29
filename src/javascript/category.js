/* import { lookup } from "dns"; */

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
        fetch('	https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            method: 'get',
            headers: {
                'Authorization': accessToken,
            }
        })
        .then(res => res.json())
        .then(function(data){
            const produkt_array = data.genres
            const mainElement = document.getElementById("main_section")
            console.log(data)
            produkt_array.forEach(element => {
                mainElement.innerHTML +=`
                <button>
                    <p>${element}</p>
                    <img src="/assets/images/_ionicons_svg_ios-more.png" alt="">
                </button>
                `
            })

                     
        })
    

    for (let i = 0; i < 1000; i++){}

        fetch('	https://api.spotify.com/v1/browse/categories/{category_id}/playlists', {
                method: 'get',
                headers: {
                    'Authorization': accessToken,
                }
            })
            .then(res => res.json())
            .then(function(data){
                const produkt_array = data.categories
                const mainElement = document.getElementById("main_section")
                console.log(data)
                produkt_array.forEach(element => {
                    mainElement.innerHTML +=`
                    <ul>
                        <li>${element}</li>
                        <li><img src="/assets/images/_ionicons_svg_ios-arrow-forward.png" alt=""></li>
                    </ul>
                    `
                })          
            })
        });
});