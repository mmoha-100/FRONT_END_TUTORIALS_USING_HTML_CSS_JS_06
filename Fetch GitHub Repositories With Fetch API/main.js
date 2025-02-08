let theInput = document.querySelector(".get-repos input");
let getBtn = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

// -----------------------------------------------------------------------

getBtn.onclick = function () {
    getRepos();
};

function getRepos() {
    if (theInput.value == "") {
        reposData.innerHTML = "<span>Don't Leave It Empty : )</span>";
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then((response) => response.json())
            .then((data) => {
                reposData.innerHTML = "";
                data.forEach((repo) => {
                    // Goals:
                    // 1) Repo Name:
                    let div = document.createElement("div");
                    div.innerHTML = repo.name;
                    // 2) Repo URL:
                    let url = document.createElement("a");
                    url.innerHTML = "Visit";
                    url.href = `https://github.com/${theInput.value}/${repo.name}`;
                    url.target = "_blank";
                    url.className = "visit";
                    // 3) Stars:
                    let span = document.createElement("span");
                    let starsText = document.createTextNode(
                        `Stars: ${repo.stargazers_count}`
                    );
                    span.appendChild(starsText);
                    // 4) Buttons Container:
                    let btns = document.createElement("div");
                    btns.style.width = "100px";
                    // Finally => Appending:
                    btns.append(span);
                    btns.append(url);
                    div.append(btns);
                    reposData.append(div);
                });
            });
    }
}
