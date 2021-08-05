const table = document.querySelector('tbody#catalog-body')
const seasons_dropdown = document.querySelector('ul#seasons-btn')

const OFFSET = 150

function ordinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n%100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
}

function season_to_str(season) {
    const season_str = '' + season

    const year = season_str.substring(0, 4)


    const season_code = season_str.substring(4, 6)
    let semester;

    if (season_code == "01") {
        semester = "Spring"
    }
    else if (season_code == "02") {
        semester = "Summer"
    } 
    else {
        semester = "Fall"
    }

    return semester + " " + year
}


function createOneCourse(course) {
    const tr = document.createElement('tr')
    tr.classList.add('course')
    tr.dataset.id = course.id

    if (course.gut_index != null) {
        tr.innerHTML = `
        <td>${course.course_code}</td>
        <td>${course.title}</td>
        <td>${course.gut_index.toFixed(2)}%</td>
        <td>${ordinal(course.gut_percentile)}</td>
        <td>${course.average_rating.toFixed(2)}</td>
        <td>${course.workload_percentile}</td>
    `
    }
    else {
        tr.innerHTML = `
        <td>${course.course_code}</td>
        <td>${course.title}</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>

    `
    }
    const td = document.createElement('td')
    if (course.average_professor != null) {
        
        td.innerHTML = `<td>${course.average_professor.toFixed(2)}</td>`
        
    }
    else {
        td.innerHTML = `<td>N/A</td>`
    }

    tr.append(td)


    table.append(tr)

}

function renderAllCourses() {
    // articlesArray.forEach(function (articleObj) {
    //     createOneCard(articleObj)
    // })

    fetch('http://127.0.0.1:3000/courses')
        .then(r => r.json())
        .then(courses => {
            console.log(courses)
            courses.forEach(createOneCourse)
        })
}

function renderNewSeasonHome(season) {
    // articlesArray.forEach(function (articleObj) {
    //     createOneCard(articleObj)
    // })

    fetch(`http://127.0.0.1:3000/courses/${season}/new_season_home`)
        .then(r => r.json())
        .then(courses => {
            console.log(courses)
            courses.forEach(createOneCourse)
        })
}


function loadMoreCourses(season) {
    // articlesArray.forEach(function (articleObj) {
    //     createOneCard(articleObj)
    // })

    fetch(`http://127.0.0.1:3000/courses/${season}/${OFFSET}/load_more`)
        .then(r => r.json())
        .then(courses => {
            console.log(courses)
            courses.forEach(createOneCourse)
        })
}

function createSeasonsList() {
    fetch('http://127.0.0.1:3000/courses/seasons')

    .then(r => r.json())
    .then(seasons => {
        console.log(seasons)
        seasons.forEach(createOneSeasonEle)
    })
}

function createOneSeasonEle(season) {
    

    const full_semester = season_to_str(season)

    li = document.createElement('li')
    li.classList.add('season')
    li.classList.add('dropdown-item')
    li.dataset.id = season

    li.textContent = full_semester


    seasons_dropdown.append(li)




}

seasons_dropdown.addEventListener('click', event => {
    if (event.target.matches('li.season')) {
        const season = parseInt(event.target.dataset.id)

        const table_name = document.querySelector('main div h1#table-title')

        table_name.textContent = season_to_str(season) + " Catalog"

        table.innerHTML = ""

        renderNewSeasonHome(season)
        loadMoreCourses(season)
    }
})


renderAllCourses()
loadMoreCourses(202103)
createSeasonsList()


// scroll event listener 

// offset SQL query 


