const form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    GetColor();
});

function GetColor(){
    const query = form.elements.query.value;
    fetch("/palette", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                query: query
            }),
        })
        .then(response => response.json())
        .then(data => {
            const colors = data.colors.colors;
            const container = document.querySelector('.container');
            CreatColorBoxes(colors, container);
        })
}

function CreatColorBoxes(colors, container){
    container.innerHTML = '';
    for(const color of colors) {
        const div = document.createElement('div');
        div.classList.add('color');
        div.style.backgroundColor = color;
        div.style.width = `calc(100%/ ${colors.length})`

        div.addEventListener('click', function() {
            navigator.clipboard.writeText(color);
        })
        const span = document.createElement('span');
        span.innerText = color;
        div.appendChild(span);
        container.appendChild(div);
    }
}
