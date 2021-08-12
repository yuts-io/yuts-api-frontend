// FETCH ONE COURSE
function getOneCourse(id) {
    return fetch(`http://127.0.0.1:3000/courses/${id}`)
    .then(r => r.json())
}

// CREATE A NEW COURSE HTML
function createOneCourse(course) {
    // add table row
    const tr = document.createElement('tr')
    tr.classList.add('course')
    tr.dataset.id = course.id
    
    // get profs
    let profs;
    course.professor_names === "" ? profs = "TBA" : profs = course.professor_names

    // handle first few data eles
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

    // create the rest of the eles w/ artisianal method
    createTableEle(course, "average_rating_same_professors", tr)
    createTableEle(course, "average_professor", tr)
    createTableEleClassed(classifyProf(course), tr)
    createTableEle(course, "professor_percentile", tr, true)
    createTableEle(course, "professor_percentile_subject", tr, true)
    createTableEle(course, "average_workload", tr)
    createTableEleClassed(classifyWork(course), tr)
    createTableEle(course, "workload_percentile", tr, true)
    createTableEle(course, "workload_percentile_subject", tr, true)

    // hanfle profs ratings, change if same prof
    if (course.last_enrollment_same_professors){
        createTableEle(course, "last_enrollment", tr, false, true)
    }
    else {
        createTableEle(course, "last_enrollment", tr, false, true, true)
    }

    // combine skills and areas
    let skills_and_areas;
    if (course.areas === "" && course.skills === "" ) {
        skills_and_areas = "N/A"
    } else if ( course.skills === "") {
        skills_and_areas = course.areas.replace(',','')
    } else if ( course.areas === "") {
        skills_and_areas = course.skills.replace(',','')
    }
    else {
        skills_and_areas = course.areas.replace(',','') + " " + course.skills.replace(',','')
    }

    // append the skills and areas table header
    const td_areas_and_skills = document.createElement('td')
    td_areas_and_skills.textContent = skills_and_areas
    tr.append(td_areas_and_skills)


    table.append(tr)
}

// LOAD COURSES AFTER OFFSET
function loadMoreCourses(season) {
    fetch(`http://127.0.0.1:3000/courses/${season}/${OFFSET}/load_more`)
    .then(r => r.json())
    .then(courses => {
        courses.forEach(createOneCourse)
    })
}

// RENDER ALL THE COURSES
function renderAllCourses() {
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
        courses.forEach(createOneCourse)
        loadMoreCourses(202103) // default is fall 2021
        main_body.dataset.id = courses[0].season_code
    })
}