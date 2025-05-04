let username = document.querySelector("#username");
let main = document.querySelector(".main");
let errorSms = document.querySelector("#error-sms");
let usernameValue = '';


async function getUserData(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    let card = `<div
            class="w-full max-w-2xl mt-10 bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-6 sm:space-y-0">
            <img class="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
                src="${data.avatar_url}" />
            <div class="text-center sm:text-left">
                <h2 class="text-2xl font-bold">${data.name ? data.name : 'N/A'}</h2>
                <p class="text-gray-600 text-sm">${data.login ? data.login : "N/A"}</p>
                <p class="text-sm text-gray-700 mt-2 italic">${data.bio ? data.bio : "N/A"}
</p>
                <div class="flex items-center gap-5 mt-2">
                    <p><span class="font-semibold">Location</span> : <span class="text-gray-900">${data.location}</span></p>
                    <p> <span class="font-semibold">Company</span> :${data.company ? data.company : 'N.A'} <span></span> </p>
                </div>
                <div class="flex items-center gap-5">
                    <p><span class="font-semibold">Followers</span> : ${data.followers ? data.followers : "N/A"} | <span
                            class="font-semibold">Following</span>:${data.following ? data.following : 'N/A'}
                    </p>
                    <p><span class="font-semibold">Public Repos</span> : ${data.public_repos ? data.public_repos : "N/A"} | <span class="font-semibold">Public_gists</span>:${data.public_gists ? data.public_gists : "N/A"}
                    </p>
                </div>
                <p class="text-sm text-gray-500"> Joined: ${new Date(data.created_at).toLocaleDateString()}</p>
                <p class="text-sm text-green-600 mt-1"> Open to Work: <span class="text-gray-700">N/A</span></p>
                <p class="text-sm text-blue-600 mt-1">
                    🔗 Blog: <a href="#" class="underline">No Blog Provided</a>
                </p>
                <p class="text-sm text-blue-600 mt-1">
                    Twitter: <span class="italic">Not Connected</span>
                </p>
                <p class="text-sm text-blue-600 mt-1 ">repositories:  <a href="https://github.com/${data.login}?tab=repositories" target="_blank"
                    class="mt-4 inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                    View Repo
                </a> </p>
                <a href="${data.html_url}" target="_blank"
                    class="mt-4 inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                    View GitHub Profile
                </a>
            </div>
        </div>`;
    main.innerHTML = card;
}

let btn = document.querySelector('#btn')
btn.addEventListener("click", () => {
    usernameValue = username.value.trim();
    console.log(usernameValue);
    if (!usernameValue) {
        errorSms.innerHTML = "This Filled Is Required"
    }
    else if (!isNaN(usernameValue)) {
        errorSms.innerHTML = "Please Enter A Valid Username"
    }
    else if (usernameValue.length < 2) {
        errorSms.innerHTML = "Please Enter At Least 2 Chachter"
    }
    else {
        errorSms.innerHTML = ""
        getUserData(usernameValue);

    }

})
username.addEventListener("input", () => {
    main.innerHTML = ''; 
});

