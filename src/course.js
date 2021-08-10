function getOneCourse(id) {
    return fetch(`http://127.0.0.1:3000/courses/${id}`)
    .then(r => r.json())

}


function createOneCourse(course) {
    const tr = document.createElement('tr')
    tr.classList.add('course')
    tr.dataset.id = course.id

    let profs;

    course.professor_names === "" ? profs = "TBA" : profs = course.professor_names

    if (course.gut_index != null) {
        tr.innerHTML = `
        <td>${course.course_code}</td>
        <td>${course.title}</td>
        <td>${profs}</td>
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
        <td>${profs}</td>
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
    if (course.last_enrollment_same_professors){
        createTableEle(course, "last_enrollment", tr, false, true)
    }
    else {
        createTableEle(course, "last_enrollment", tr, false, true, true)
    }


    let skills_and_areas;
    if (course.areas === "" && course.skills === "" ) {
        // console.log("N/A")
        skills_and_areas = "N/A"

    } else if ( course.skills === "") {
        // console.log(course.areas)
        skills_and_areas = course.areas.replace(',','')
    } else if ( course.areas === "") {
        // console.log(course.skills)
        skills_and_areas = course.skills.replace(',','')

    }
    else {
        // console.log(course.areas.replace(',','') + " " + course.skills.replace(',',''))
        skills_and_areas = course.areas.replace(',','') + " " + course.skills.replace(',','')

    }

    const td_areas_and_skills = document.createElement('td')

    td_areas_and_skills.textContent = skills_and_areas

    tr.append(td_areas_and_skills)

    // createTableEleClassed(course.times_summary, tr)


    const guttiness = classifyGut(course)

    table.append(tr)

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

function renderAllCourses() {
    // articlesArray.forEach(function (articleObj) {
    //     createOneCard(articleObj)
    // })

    fetch('http://127.0.0.1:3000/courses', {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
        .then(r => r.json())
        .then(courses => {
            console.log(courses)
            courses.forEach(createOneCourse)
            loadMoreCourses(202103)
            main_body.dataset.id = courses[0].season_code
        })
        
}