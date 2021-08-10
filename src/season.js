function renderNewSeasonHome(season) {
    // articlesArray.forEach(function (articleObj) {
    //     createOneCard(articleObj)
    // })

    fetch(`http://127.0.0.1:3000/courses/${season}/new_season_home`)
        .then(r => r.json())
        .then(courses => {
            console.log(courses)
            console.log(season)
            main_body.dataset.id = courses[0].season_code
            courses.forEach(createOneCourse)
            loadMoreCourses(season)
            
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