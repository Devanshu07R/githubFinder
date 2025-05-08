let username = document.querySelector("#username");
let main = document.querySelector(".main");
let errorSms = document.querySelector("#error-sms");
let searchHistoryBtn = document.querySelector(".search-history-btn");
let searchHistorDiv = document.querySelector(".search-history-div")
let usernameValue = '';
let overly = document.querySelector(".overly");
console.log(overly);
let clearAllBtn = document.querySelector(".clear-all-btn");

async function getUserData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            main.innerHTML = `<p class="text-red-600 text-center text-xl font-semibold mt-10"> No User Found</p>`;
            return;
        }
        const data = await response.json();
        console.log(data);
        let card = `<div class="w-full max-w-2xl mt-10 bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-6 sm:space-y-0">
            <img class="w-40 h-40 rounded-full object-cover border-4 border-gray-300" src="${data.avatar_url}" />
            <div class="text-center sm:text-left">
                <h2 class="text-2xl font-bold">${data.name ? data.name : 'N/A'}</h2>
                <p class="text-gray-600 text-sm">@${data.login || "N/A"}</p>
                <p class="text-sm text-gray-700 mt-2 italic">${data.bio || "N/A"}</p>
                <div class="flex items-center gap-5 mt-2">
                    <p><span class="font-semibold">Location</span> : <span class="text-gray-900">${data.location || 'N/A'}</span></p>
                    <p> <span class="font-semibold">Company</span> :${data.company || 'N/A'} </p>
                </div>
                <div class="flex items-center gap-5">
                    <p><span class="font-semibold">Followers</span> : ${data.followers} | <span class="font-semibold">Following</span>: ${data.following}</p>
                    <p><span class="font-semibold">Public Repos</span> : ${data.public_repos} | <span class="font-semibold">Public Gists</span>: ${data.public_gists}</p>
                </div>
                <p class="text-sm text-gray-500">Joined: ${new Date(data.created_at).toLocaleDateString()}</p>
                <p class="text-sm text-green-600 mt-1">Open to Work: <span class="text-gray-700">N/A</span></p>
                <p class="text-sm text-blue-600 mt-1"> Blog: <a href="${data.blog || '#'}" class="underline">${data.blog ? data.blog : 'No Blog Provided'}</a></p>
                <p class="text-sm text-blue-600 mt-1">Twitter: <span class="italic">${data.twitter_username || 'Not Connected'}</span></p>
                <p class="text-sm text-blue-600 mt-1">Repositories: <a href="https://github.com/${data.login}?tab=repositories" target="_blank" class="mt-4 inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">View Repo</a></p>
                <a href="${data.html_url}" target="_blank" class="mt-4 inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">View GitHub Profile</a>
            </div>
        </div>`;
        main.innerHTML = card;
        saveData(data)
        showHistory();

    } catch (error) {
        main.innerHTML = `<p class="text-red-600 text-center text-xl font-semibold mt-10"> Something went wrong. Please try again later.</p>`;
        console.error(error);
    }
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

// searchHistoryBtn function add
let check = true;
searchHistoryBtn.addEventListener("click", () => {
    if (check) {
        searchHistorDiv.style.right = "0%",
            searchHistorDiv.style.transition = "0.5s",
            overly.style.display = "block";
        check = false
    }
    else {
        searchHistorDiv.style.right = "-100%",
            searchHistorDiv.style.transition = "0.5s",
            overly.style.display = "none";
        check = true
    }
})


// showcase githube user history data
function showHistory() {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    console.log("save data", history);
    let cultter = "";
    if (history) {
        history.forEach((item, index) => {
            cultter += `<div class="w-full max-w-2xl mt-10 bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-6 sm:space-y-0">
            <img class="w-40 h-40 rounded-full object-cover border-4 border-gray-300" src="${item.avatar_url}" />
            <div class="text-center sm:text-left">
                <h2 class="text-2xl font-bold">${item.name || 'N/A'}</h2>
                <p class="text-gray-600 text-sm">@${item.login || "N/A"}</p>
                <p class="text-sm text-gray-700 mt-2 italic">${item.bio || "N/A"}</p>
                <div class="flex items-center gap-5 mt-2">
                    <p><span class="font-semibold">Location</span> : <span class="text-gray-900">${item.location || 'N/A'}</span></p>
                    <p> <span class="font-semibold">Company</span> :${item.company || 'N/A'} </p>
                </div>
                <div class="flex items-center gap-5">
                    <p><span class="font-semibold">Followers</span> : ${item.followers} | <span class="font-semibold">Following</span>: ${item.following}</p>
                    <p><span class="font-semibold">Public Repos</span> : ${item.public_repos} | <span class="font-semibold">Public Gists</span>: ${item.public_gists}</p>
                </div>
                <p class="text-sm text-gray-500">Joined: ${new Date(item.created_at).toLocaleDateString()}</p>
                <p class="text-sm text-green-600 mt-1">Open to Work: <span class="text-gray-700">N/A</span></p>
                <p class="text-sm text-blue-600 mt-1">🔗 Blog: <a href="${item.blog || '#'}" class="underline">${item.blog ? item.blog : 'No Blog Provided'}</a></p>
                <p class="text-sm text-blue-600 mt-1">Twitter: <span class="italic">${item.twitter_username || 'Not Connected'}</span></p>
                <p class="text-sm text-blue-600 mt-1">Repositories: <a href="https://github.com/${item.login}?tab=repositories" target="_blank" class="mt-4 inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">View Repo</a></p>
                <a href="${item.html_url}" target="_blank" class="mt-4 inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">View GitHub Profile</a>
                <button onclick="deleteData(${index})" class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                     Delete
                </button>   
             </div>
        </div>`

        })
        console.log("save data", cultter);
        searchHistorDiv.innerHTML = cultter;
    }
}



showHistory();

// localstorage save function
function saveData(data) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    console.log("Old history:", history);
    history.push(data);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    console.log("Saved data:", data);
}



// delete data 
function deleteData(id) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let confirm = window.confirm("Are You Sure Went To Delete This Data");
    if (confirm) {
        history.splice(id, 1)
        localStorage.setItem("searchHistory", JSON.stringify(history));
        showHistory()
    }
}