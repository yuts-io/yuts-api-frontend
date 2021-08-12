function search() {
    
    const searchBar = document.querySelector('input#searchBar')
    const filter = searchBar.value.toUpperCase()
    const rows = document.querySelectorAll("tbody#catalog-body tr.course")


    for (let i = 0; i < rows.length; i++) {
        const codeEle = rows[i].getElementsByTagName("td")[0]
        const titleEle = rows[i].getElementsByTagName("td")[1]
        const profEle = rows[i].getElementsByTagName("td")[2]

        const txtValueCode = codeEle.textContent || codeEle.innerText
        const txtValueTitle= titleEle.textContent || titleEle.innerText
        const txtValueProf = profEle.textContent || profEle.innerText

        // console.log(txtValue)
        if (txtValueCode.toUpperCase().indexOf(filter) > -1 || txtValueTitle.toUpperCase().indexOf(filter) > -1 || txtValueProf.toUpperCase().indexOf(filter) > -1) {
            rows[i].style.display = ""
        } else {
            rows[i].style.display = "none"
        }
    } 
}

function checkIfBlank(course, course_attr, tba=false) {
    if (course[course_attr] === "" || course[course_attr] === null) {
        if (tba) {
            return "TBA"
        }
        else {
            return "N/A"
        }
    }
    else {
        return course[course_attr]
    }
}

function cleanStats(course, subject) {

    let statsArr = []

    let mean = checkIfBlank(course, subject + "_mean")

    if (mean != "N/A") {
        mean = (course[subject + "_mean"].toFixed(2))
    }

    statsArr.push(mean)

    let median = checkIfBlank(course, subject + "_median")

    if (median != "N/A") {
        median = (course[subject + "_median"].toFixed(2))
    }

    statsArr.push(median)


    let standard_deviation = checkIfBlank(course, subject + "_standard_deviation")

    if (standard_deviation != "N/A") {
        standard_deviation = (course[subject + "_standard_deviation"].toFixed(2))
    }

    statsArr.push(standard_deviation)

    let mode = checkIfBlank(course, subject + "_mode")

    if (mode != "N/A") {
        mode = (course[subject + "_mode"].toFixed(2))
    }

    statsArr.push(mode)


    let range = checkIfBlank(course, subject + "_range")

    if (range != "N/A") {
        range = (course[subject + "_range"].toFixed(2))
    }

    statsArr.push(range)

    return statsArr
}

function cleanOneStat(course, attr, rank=false) {
    let result = checkIfBlank(course, attr)

    result === "N/A" ? result = "N/A" : result = course[attr].toFixed(2)

    if (rank) {
        if (result != "N/A") {
           result =  ordinal(Math.round(result))
        }
    }

    return result
}


searchForm.addEventListener('submit', event => {
    event.preventDefault()

    search()
})