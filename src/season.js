
// RENDERS A NEW SEMESTER OF CLASSES
function renderNewSeasonHome(season) {
    fetch(`http://127.0.0.1:3000/courses/${season}/new_season_home`)
        .then(r => r.json())
        .then(courses => {
            // all courses in season have same season code, store it in main body
            main_body.dataset.id = courses[0].season_code
            courses.forEach(createOneCourse)
            loadMoreCourses(season)
            
        })
}


// LOADS THE LIST OF SEMESTERS IN SEMESTER DROPDOWN
function createSeasonsList() {
    fetch('http://127.0.0.1:3000/courses/seasons')

    .then(r => r.json())
    .then(seasons => {
        console.log(seasons)
        seasons.forEach(createOneSeasonEle)
    })
}

// CREATE A SEASON ELEMENT IN THE DROPDOWN
function createOneSeasonEle(season) {
    
    const full_semester = season_to_str(season)

    li = document.createElement('li')
    li.classList.add('season')
    li.classList.add('dropdown-item')
    li.dataset.id = season

    li.textContent = full_semester


    seasons_dropdown.append(li)

}