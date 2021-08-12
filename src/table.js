// ADD TABLE BACK TO MAIN BODY
function refreshTable() {
    main_body.innerHTML = `
    <table class="table table-striped table-sticky table-hover">
        <thead>
            <tr>
                <th scope="col">Code</th>
                <th scope="col">Title</th>
                <th scope="col">Prof</th>
                <th scope="col">Gut Index</th>
                <th scope="col">Guttiness</th>
                <th scope="col">Gut Rank</th>
                <th scope="col">Gut Subject Rank</th>
                <th scope="col">Overall Rating</th>
                <th scope="col">Prof Rating</th>
                <th scope="col">Grading</th>
                <th scope="col">Prof Rank</th>
                <th scope="col">Prof Subject Rank</th>
                <th scope="col">Work Rating</th>
                <th scope="col">Workload</th>
                <th scope="col">Work Rank</th>
                <th scope="col">Work Subject Rank</th>
                <th scope="col">#</th>
                <th scope="col">Skills/Areas</th>
            </tr>
        </thead>
        <tbody id="catalog-body">
            <!-- Dynamic table content here -->
        </tbody>
    </table>
    `
}

// CREATE A TABLE ELEMENT
// HANDLES RANK STYLING, ESTIMATION (ADDING ~ TO ENROLLMENT), AND INTEGER VS FLOAT
function createTableEle(obj, category, outerDiv, rank=false, reg_int=false, estimated=false) {
    const td = document.createElement('td')
    if (obj[category] != null) {
        if (!rank) {    
            if (!reg_int) {
                // handle float val
                td.innerHTML = `<td>${obj[category].toFixed(2)}</td>`
            }
            else if (!estimated) {
                // handle non estimation
                td.innerHTML = `<td>${obj[category]}</td>`
            }
            else {
                // handle estimation
                td.innerHTML = `<td>~${obj[category]}</td>`
            }
        }
        else {
            // handle percentile
            td.innerHTML = `<td>${ordinal(obj[category])}</td>`
        }
    }
    else {
        // handle null val
        td.innerHTML = `<td>N/A</td>` 
    }

    outerDiv.append(td)
}

// CLASSIFY A TABLE ELE
// creates the guttiness, grading, and workload vals
function createTableEleClassed(classification, outerDiv) {

    const td = document.createElement('td')
    td.innerHTML = `<td>${classification}</td>`

    outerDiv.append(td)
}

// CLASSIFICATION OF GUTS, PROFS, AND WORKLOAD
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


// CHANGE RANK NUMS TO ORDINAL
function ordinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n%100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
}

// CONVERT SEASON CODE TO A STRING
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
