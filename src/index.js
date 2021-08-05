const table = document.querySelector('tbody#catalog-body')

const OFFSET = 150

function ordinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n%100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
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

function loadMoreCourses() {
    // articlesArray.forEach(function (articleObj) {
    //     createOneCard(articleObj)
    // })

    fetch(`http://127.0.0.1:3000/courses/${OFFSET}/load_more`)
        .then(r => r.json())
        .then(courses => {
            console.log(courses)
            courses.forEach(createOneCourse)
        })
}

renderAllCourses()
loadMoreCourses()


// scroll event listener 

// offset SQL query 


