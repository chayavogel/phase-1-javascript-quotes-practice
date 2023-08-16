document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/quotes?_embed=likes", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(data) {
        for (const obj of data) {
            handleData(obj)
        }
    })
})

function handleData(obj) {
    const ul = document.getElementById("quote-list")

    const li = document.createElement("li")
    li.setAttribute("class", "quote-card")

    const blockQuote = document.createElement("blockquote")
    blockQuote.setAttribute("class", "blockquote")

    const p = document.createElement("p")
    p.setAttribute("class", "mb-0")
    p.innerText = obj.quote
    const footer = document.createElement("footer")
    footer.setAttribute("class", "blockquote-footer")
    footer.innerText = obj.author
    const br = document.createElement("br")
    const buttonSuccess = document.createElement("button")
    buttonSuccess.setAttribute("class", "btn-success")
    buttonSuccess.innerText = "Likes: "
    const btnSpan = document.createElement("span")
    btnSpan.innerText = 0
    const buttonDanger = document.createElement("button")
    buttonDanger.setAttribute("class", "btn-danger")
    buttonDanger.innerText = "Delete"

    ul.append(li)
    li.append(blockQuote)
    blockQuote.append(p, footer, br, buttonSuccess, buttonDanger)
    buttonSuccess.appendChild(btnSpan)

    buttonDanger.addEventListener("click", function() {
        li.remove()
        deleteObj(obj.id)
    })

    function deleteObj(id) {
        fetch(`http://localhost:3000/quotes/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(obj => console.log(obj))
    }


}

const form = document.getElementById("new-quote-form")
form.addEventListener("submit", function(event) {
    event.preventDefault()

    fetch(`http://localhost:3000/quotes`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({
            quote: event.target.quote.value,
            author: event.target.author.value
        })
    })
    .then(res => res.json())
    .then(obj => handleData(obj))
})
