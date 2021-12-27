let userList = document.getElementById('user-list')


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#github-form")
    
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSearch(e);
    form.reset();
    })


})
function handleSearch(e){
    let name = e.target.search.value
    fetch(`https://api.github.com/search/users?q=octocat`, {
        method : 'GET',
        headers:
        {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
        },
        body: JSON.stringify(),
        })
    
    .then(res => res.json())
    .then(data => {
        let userObj = data.items.find(el => el['login'] === name)
        console.log(userObj.login)
        printUserInfo(userObj)
        })       
}

    
function printUserInfo(userObj) {
    let li = document.createElement('li')
    li.innerHTML = `
    <ul>
        <h2> ${userObj.login} <a href = ${userObj.url}> Link to profile </a></h2>
        <button type="button" class = "search-repos" id = ${userObj.login}>Click to see my repos!</button>
        <li> <img src = ${userObj.avatar_url}> </li>
        
    </ul>`
    document.getElementById('user-list').appendChild(li)

    const btn = li.querySelector('.search-repos')
    btn.addEventListener('click', () => getRepos(userObj.login))
}

function getRepos(user){
    fetch(`https://api.github.com/users/${user}/repos`, {
        method : 'GET',
        headers:
        {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
        },
        body: JSON.stringify(),
        })
    
    .then(res => res.json())
    .then(data => {
        console.log(data)
        printRepos(data)
        })
    }

function printRepos(arr){
    arr.forEach(repo => {
        let li = document.createElement('li')
        li.innerHTML = `<a href = ${repo.html_url}>${repo.full_name}</a>`
        document.getElementById("repos-list").appendChild(li)
    })
}