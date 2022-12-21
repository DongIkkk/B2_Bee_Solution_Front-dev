window.onload = async function load_solutions() {

    const main_url = "http://127.0.0.1:8000"
    const article_id = localStorage.getItem('article_id')

    const response = await fetch(`${main_url}/article/${article_id}/solution/`, {
        header: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "GET"
    })

    response_json = await response.json()
    console.log(response_json)


    const img_box = document.getElementById('img_box')

    response_json.solution.forEach(element => {

        const main_img = document.createElement('div')
        main_img.style.display = 'flex'
        main_img.style.flexDirection = 'column'

        const solution_img = document.createElement('img')
        solution_img.src = `${main_url}${element.solution_image}`
        solution_img.style.width = '250px';
        solution_img.style.height = '250px';
        solution_img.style.margin = '10px 15px';
        solution_img.style.borderRadius = '15%';
        solution_img.onmouseover = function () {
            solution_img.style.transform = 'scale(1.1)'
        }
        solution_img.onmouseout = function () {
            solution_img.style.transform = 'scale(1)'
        }

        const btn_box = document.createElement('div')
        btn_box.style.display = 'flex'
        btn_box.style.flexDirection = 'row'
        btn_box.style.justifyContent = 'center'

        const best = document.createElement('button')
        best.textContent = 'best'
        best.style.border = '0'
        best.style.borderRadius = '20%'
        best.style.backgroundColor = '#F5D10D'
        best.onclick = function () {
            rating(element.id, 4)
        }
        const soso = document.createElement('button')
        soso.textContent = 'soso'
        soso.style.border = '0'
        soso.style.borderRadius = '20%'
        soso.style.backgroundColor = '#F5D10D'
        soso.onclick = function () {
            rating(element.id, 2)
        }
        const bad = document.createElement('button')
        bad.textContent = 'bad'
        bad.style.border = '0'
        bad.style.borderRadius = '20%'
        bad.style.backgroundColor = '#F5D10D'
        bad.onclick = function () {
            rating(element.id, 0)
        }

        btn_box.appendChild(best)
        btn_box.appendChild(soso)
        btn_box.appendChild(bad)

        main_img.appendChild(solution_img)
        main_img.appendChild(btn_box)
        img_box.appendChild(main_img)
    })
}


async function rating(solution_id, value) {

    const main_url = "http://127.0.0.1:8000"
    const article_id = localStorage.getItem('article_id')

    const response = await fetch(`${main_url}/article/${article_id}/solution/${solution_id}/`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access'),
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "rating": value
        })
    })

    alert('평가완료')
}

fetch("./navbar.html").then(response => {
    return response.text()
})
    .then(data => {
        document.querySelector("header").innerHTML = data
    })

function save_category_id(category_id) {
    localStorage.setItem('category_id', category_id)
    window.location.replace("articles.html")
}