document.addEventListener("DOMContentLoaded", () => {
    let Base64 = "basic ZjFlYmQ5YmRjMTVlNDhlMGIxYmNmZjhiNmY0NmNjZjA6ZTFmZjNkNDhjMDRiNGIzNGFjYzZkMmYyMGQxYmNjMDY=";
    fetch('https://accounts.spotify.com/api/token', {
        method: 'post',
        body: "grant_type=client_credentials",
        headers: {
            'Authorization': Base64,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res => res.json())
    .then(json => {
    let accessToken = "Bearer "+ json.access_token;
        fetch('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl', {
            method: 'get',
            headers: {
                'Authorization': accessToken,
            }
        })
        .then(res => res.json())
        .then(tracks => console.log(tracks))
    console.log(json.access_token)
    
    });
});