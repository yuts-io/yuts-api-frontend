function search() {
    console.log("searched")
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


searchForm.addEventListener('submit', event => {
    event.preventDefault()

    search()
})