document.addEventListener("DOMContentLoaded", function() {
    const profileForm = document.getElementById("profileForm");
    const submitButton = document.getElementById("submitButton");
    const loadingDiv = document.getElementById("loading");
    const resultDiv = document.getElementById("result");
    const usernameInput = document.getElementById("username");


    profileForm.addEventListener("submit", async function(event){
        event.preventDefault();
        submitButton.disabled = true;
        loadingDiv.style.display = "block";

        const username = usernameInput.value;
        const encodedUsername = encodeURIComponent(username);

        try {
            const response = await fetch(`/get_info?username=${encodedUsername}`);
            const data = await response.json();
            if (data.error){
                resultDiv.innerHTML =`
                <p>${data.error}</p>`;
            }else{
                resultDiv.innerHTML = `
            <p><strong>Username: </strong>${data.username}</p>
            <p><strong>User ID: </strong>${data.userid}</p>
            <p><strong>Number of Posts: </strong>${data.mediacount}</p>
            <p><strong>Followers: </strong>${data.followers}</p>
            <p><strong>Followees: </strong>${data.followees}</p>
            <p><strong>Bio: </strong>${data.biography}</p>
            `;
            }
            loadingDiv.style.display = "none";
            resultDiv.style.display = "block";
        }catch(error){
            console.error(error);
            resultDiv.innerHTML ="<p>Error fetching profile information</p>";
        }finally{
            submitButton.disabled = false;
            usernameInput.value = "";//clear the input box
        }
    });
});