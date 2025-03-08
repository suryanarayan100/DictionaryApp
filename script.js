const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    infoText = wrapper.querySelector(".info-text");

function fetchApi(word) {
    infoText.innerHTML = `Searching for <span>"${word}"</span>`;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        .then(data => {
            if (data.title) {
                infoText.innerHTML = `No results for <span>"${word}"</span>`;
                return;
            }
            let entry = data[0];
            document.querySelector(".word p").innerText = entry.word;
            document.querySelector(".word span").innerText = entry.phonetics.length ? entry.phonetics[0].text : "";
            document.querySelector(".meaning span").innerText = entry.meanings[0].definitions[0].definition;

            // Example Handling
            let exampleElement = document.querySelector(".example span");
            let example = entry.meanings[0].definitions[0].example;
            exampleElement.innerText = example ? example : "Not Available";

            // Synonyms Handling
            let synonymsElement = document.querySelector(".synonyms .list");
            let synonyms = entry.meanings[0].synonyms;
            if (synonyms && synonyms.length > 0) {
                synonymsElement.innerHTML = synonyms.slice(0, 5).map(syn => `<span>${syn}</span>`).join(", ");
            } else {
                synonymsElement.innerHTML = "Not Available";
            }

            wrapper.classList.add("active");
        })
        .catch(() => infoText.innerHTML = `Error fetching data.`);
}

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && searchInput.value.trim()) fetchApi(searchInput.value.trim());
});
