const table = document.querySelector('tbody#catalog-body')
const seasons_dropdown = document.querySelector('ul#seasons-btn')

const OFFSET = 150

function createTableEle(obj, category, outerDiv, rank=false) {
    const td = document.createElement('td')
    if (obj[category] != null) {
        if (!rank) {
            td.innerHTML = `<td>${obj[category].toFixed(2)}</td>`
        }
        else {
            td.innerHTML = `<td>${ordinal(obj[category])}</td>`
        }

        
    }
    else {
        td.innerHTML = `<td>N/A</td>`
    }

    outerDiv.append(td)
}

function createTableEleClassed(classification, outerDiv) {

    const td = document.createElement('td')
    td.innerHTML = `<td>${classification}</td>`

    outerDiv.append(td)

}

function classifyGut(course) {
    if (course["gut_percentile"] === null || course["gut_percentile_subject"] === null) {
        return "N/A"
    }
    else if (course["gut_percentile"] >= 75 && course["gut_percentile_subject"] >= 50 && (course["workload_percentile"] != null && course["workload_percentile"] <= 25)
        && (course["workload_percentile_subject"] != null && course["workload_percentile_subject"] <= 50) && (course["professor_percentile"] != null && course["professor_percentile"] >= 75)
        && (course["professor_percentile_subject"] != null && course["professor_percentile_subject"] >= 50)) {
        
        return "Gut"
    }   
    else if ((100 >= course["gut_percentile"] && course["gut_percentile"] >= 67) || (100 >= course["gut_percentile_subject"] && course["gut_percentile_subject"] >= 67)) {
        return "Relaxed"
    }
    else if ((67 > course["gut_percentile"] && course["gut_percentile"] > 33) || (67 > course["gut_percentile_subject"] && course["gut_percentile"] > 33)) {
        return "Average"
    }
    else if (course["gut_percentile"] <= 25 && course["gut_percentile_subject"] < 50 && (course["workload_percentile"] != null && course["workload_percentile"] >= 75)
    && (course["workload_percentile_subject"] != null && course["workload_percentile_subject"] > 50) && (course["professor_percentile"] != null && course["professor_percentile"] <= 25)
            && (course["professor_percentile_subject"] != null && course["professor_percentile_subject"] < 50)) {
        return "Grueling"
    }
    else {
    // case when (33 >= course["gut_percentile"] >= 0) || (33 >= course["gut_percentile_subject"] >= 0)
        return "Challenging"
    }
}

function classifyProf(course) {
    if (course["professor_percentile"] === null || course["professor_percentile_subject"] === null) {
        return "N/A"
    }
    else if (course["professor_percentile"] >= 75 && course["professor_percentile_subject"] >= 50 && (course["workload_percentile"] != null && course["workload_percentile"] <= 25)
        && (course["workload_percentile_subject"] != null && course["workload_percentile_subject"] <= 50) && (course["professor_percentile"] != null && course["professor_percentile"] >= 75)) {
        return "Exceptional"
    }   
    else if ((100 >= course["professor_percentile"] && course["professor_percentile"] >= 67) || (100 >= course["professor_percentile_subject"] && course["professor_percentile_subject"] >= 67)) {
        return "Good"
    }
    else if ((67 > course["professor_percentile"] && course["professor_percentile"] > 33) || (67 > course["professor_percentile_subject"] && course["professor_percentile"] > 33)) {
        return "Average"
    }
    else if (course["professor_percentile"] <= 25 && course["professor_percentile_subject"] < 50 && (course["workload_percentile"] != null && course["workload_percentile"] >= 75)
    && (course["workload_percentile_subject"] != null && course["workload_percentile_subject"] > 50) && (course["professor_percentile"] != null && course["professor_percentile"] <= 25)) {
        return "Harsh"
    }
    else {
    // case when (33 >= course["gut_percentile"] >= 0) || (33 >= course["gut_percentile_subject"] >= 0)
        return "Tough"
    }
}

function classifyWork(course) {
    if (course["workload_percentile"] === null || course["workload_percentile_subject"] === null) {
        return "N/A"
    }
    else if (course["workload_percentile"] >= 67 && course["workload_percentile_subject"] >= 67) {
        return "Heavy"
    }   
    else if ((67 > course["workload_percentile"] && course["workload_percentile"] >= 33) && (67 > course["workload_percentile_subject"] && course["workload_percentile_subject"] >= 33)) {
        return "Average"
    }
    else if ((course["workload_percentile"] < 33) && (course["workload_percentile_subject"] < 33)) {
        return "Light"
    }
    else if (course["workload_percentile"] > 50 && course["workload_percentile_subject"] >= 67){
        return "Relatively Harsh"
    }
    else if (course["workload_percentile"] < 50 && course["workload_percentile_subject"] <= 33){
        return "Relatively Light"
    }
    else {
    // case when (33 >= course["gut_percentile"] >= 0) || (33 >= course["gut_percentile_subject"] >= 0)
        return "Relatively Average"
    }
}

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
        <td>${classifyGut(course)}</td>
        <td>${ordinal(course.gut_percentile)}</td>
        <td>${ordinal(course.gut_percentile_subject)}</td>
        

    `
    }
    else {
        tr.innerHTML = `
        <td>${course.course_code}</td>
        <td>${course.title}</td>
        <td>N/A</td>
        <td>${classifyGut(course)}</td>
        <td>N/A</td>
        <td>N/A</td>
    `
    }

    createTableEle(course, "average_rating_same_professors", tr)
    createTableEle(course, "average_professor", tr)

    createTableEleClassed(classifyProf(course), tr)
    createTableEle(course, "professor_percentile", tr, true)
    createTableEle(course, "professor_percentile_subject", tr, true)
    createTableEle(course, "average_workload", tr)
    createTableEleClassed(classifyWork(course), tr)
    createTableEle(course, "workload_percentile", tr, true)
    createTableEle(course, "workload_percentile_subject", tr, true)

    const guttiness = classifyGut(course)

    // console.log(guttiness)


    // const td = document.createElement('td')
    // if (course.average_professor != null) {
        
    //     td.innerHTML = `<td>${course.average_professor.toFixed(2)}</td>`
        
    // }
    // else {
    //     td.innerHTML = `<td>N/A</td>`
    // }

    // tr.append(td)


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
            loadMoreCourses(202103)
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
            loadMoreCourses(season)
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
        // loadMoreCourses(season)
    }
})

// let scrolled_once = false

// document.addEventListener('scroll', event => {
//     if (!scrolled_once) {

//         loadMoreCourses(202103)
//         scrolled_once = true
//     }
        
// })


renderAllCourses()

createSeasonsList()


// scroll event listener 

// offset SQL query 


