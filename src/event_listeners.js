let table = document.querySelector('tbody#catalog-body')
const seasons_dropdown = document.querySelector('ul#seasons-btn')
// container that holds table and course show pages
const main_body = document.querySelector('div#main-body')
const searchForm = document.querySelector('form#searchForm')

// The amount of courses loaded on page load
// OFFSET # courses are loaded, then the rest follow
const OFFSET = 150

// change which semester the user sees in the table
seasons_dropdown.addEventListener('click', event => {
    if (event.target.matches('li.season')) {

        const season = parseInt(event.target.dataset.id)
        const table_name = document.querySelector('main div h1#table-title')

        table_name.textContent = season_to_str(season) + " Catalog"

        table.innerHTML = ""

        renderNewSeasonHome(season)
    }
})


// MAIN EVENT LISTENER
// HANDLES WHEN USER CLICKS A COURSE ON TABLE

main_body.addEventListener('click', event => {
    if (event.target.matches('tbody td')) {
        // grab course info
        const tr = event.target.closest('tr')
        const id = tr.dataset.id
        
        // clear table
        main_body.innerHTML = ""
        const table_name = document.querySelector('main div h1#table-title')

        // FETCH COURSE FROM API

        clicked_course = getOneCourse(id)
        clicked_course.then(course => {

            // change table name to course title
            table_name.textContent = course.title + ` (${season_to_str(course.season_code)})`
            table_name.dataset.id = id

            // create new show section
            const show_section = document.createElement('section')

            // handle syllabus url html
            let syll_url;

            if (course.syllabus_url === null) {
                syll_url = `
                    <div class="col-sm-9 col-8">
                        <div class="px-0 col-sm-3 col-4"><span>N/A</span></div>
                    </div>
                `
            }
            else {
                syll_url = `
                <div class="col-sm-9 col-8">
                    <a target="_blank" rel="noopener noreferrer" href="${course.syllabus_url}" class="d-flex">
                    View Syllabus
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" class="ml-1 my-auto" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                    </a>
                </div>
                `
    
            }

            // CLEAN ALL COURSE DATA

            const prof = checkIfBlank(course, "professor_names", true)
            const meets = checkIfBlank(course, "times_summary", true)
            const location = checkIfBlank(course, "locations_summary", true)
            const creds = checkIfBlank(course, "credits")
            const enrollment = checkIfBlank(course, "last_enrollment")
            const section_course = checkIfBlank(course, "section", true)

            const gut_index = cleanOneStat(course, "gut_index")
            const average_rating = cleanOneStat(course, "average_rating")
            const average_professor= cleanOneStat(course, "average_professor")
            const average_workload = cleanOneStat(course, "average_workload")

            const gut_rank = cleanOneStat(course, "gut_percentile", true)
            const gut_sub_rank = cleanOneStat(course, "gut_percentile_subject", true)
            const professor_rank = cleanOneStat(course, "professor_percentile", true)
            const professor_sub_rank = cleanOneStat(course, "professor_percentile_subject", true)
            const work_rank = cleanOneStat(course, "workload_percentile", true)
            const work_sub_rank = cleanOneStat(course, "workload_percentile_subject", true)

            const gutsArr = cleanStats(course, "gut_index")
            const profsArr = cleanStats(course, "average_professor")
            const workArr = cleanStats(course, "average_workload")
            
            const gutsArrSub = cleanStats(course, "gut_index_subject")
            const profsArrSub = cleanStats(course, "average_professor_subject")
            const workArrSub = cleanStats(course, "average_workload_subject")
    
            // SHOW PAGE HTML

            show_section.innerHTML = 

            `
            <div class="m-auto row">
                <div class="px-0 mt-0 mb-3 col-md-5">
                    <div class="mx-auto row">
                        <div>${course.description}<wbr></div>
                    </div>
                    <div class="m-auto py-2 mt-3 row">
                        <div class="card">
                            
                            <div class="card-body" id="back-btn-container">
                                <h5 class="card-title">${course.course_code} Stats<span class="pe-2 mt-2" style="float: right; font-size: .85rem"> Overall Rating: ${average_rating}</span></h5>
                                <hr class="mt-1">
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            Gut Index
                                        </div>
                                        <div class="col">
                                            Prof Rating
                                        </div>
                                        <div class="col">
                                            Work Rating
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            ${gut_index}
                                        </div>
                                        <div class="col">
                                            ${average_professor}
                                        </div>
                                        <div class="col">
                                            ${average_workload}
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col">
                                            Gut Rank
                                        </div>
                                        <div class="col">
                                            Prof Rank
                                        </div>
                                        <div class="col">
                                            Work Rank
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            ${gut_rank}
                                        </div>
                                        <div class="col">
                                            ${professor_rank}
                                        </div>
                                        <div class="col">
                                            ${work_rank}
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col">
                                            Gut Sub Rank
                                        </div>
                                        <div class="col">
                                            Prof Sub Rank
                                        </div>
                                        <div class="col">
                                            Work Sub Rank
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            ${gut_sub_rank}
                                        </div>
                                        <div class="col">
                                            ${professor_sub_rank}
                                        </div>
                                        <div class="col">
                                            ${work_sub_rank}
                                        </div>
                                </div>

        
                                </div>
                            
                                
                            </div>
                        </div>
                    </div>
                    <div class="m-auto pt-4 pb-2 row">
                        <div class="px-0 col-sm-2 col-2"><span>Syllabus</span></div>
                        <div class="col-sm-4 col-4"><span>${syll_url}</span></div>
                        <div class="px-0 col-sm-2 col-2"><span>Location</span></div>
                        <div class="col-sm-2 col-2">${location}</div>

    

                    </div>
                    <div class="m-auto py-2 row">
                        <div class="px-0 col-sm-2 col-2"><span>Professor</span></div>
                        <div class="col-sm-4 col-4"><span>${prof}</span></div>
                        <div class="px-0 col-sm-2 col-2"><span>Meets</span></div>
                        <div class="col-sm-4 col-4">${meets}</div>
                    </div>
                    <div class="m-auto py-2 row">
                        <div class="px-0 col-sm-2 col-2"><span class="align-middle">Credits</span></div>
                        <div class="col-sm-4 col-4"><span class="align-middle">${creds}</span></div>
                        <div class="px-0 col-sm-2 col-2"><span>Enrollment</span></div>
                        <div class="col-sm-4 col-4">${enrollment}</div>
                    </div>
                
                    <div class="m-auto py-2 row">
                        
                    </div>

                </div>
                <div class="px-0 my-0 col-md-7 justify-content-center">
                    <div class="m-auto pt-4 pb-1 justify-content-end row">
                        <div class="px-0 me-3 text-center col-10" style="flex: 0 0 auto;">
                            <h5>${season_to_str(course.season_code) + " Stats"}</h5>
                            <hr>
                        </div>
                    </div>
                    <div class="m-auto pb-1 justify-content-center row">
                        <div class="d-flex justify-content-center px-0 mr-3 col-5"><span>Attribute</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-1"><span>Mean</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-1"><span>Median</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-2"><span>Standard Deviation</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-1"><span>Mode</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-1"><span>Range</span></div>

                    </div>
                    <div class="m-auto py-1 justify-content-center row">
                        <div class="px-0 mr-3 text-center col-5" style="flex: 0 0 auto;">
                            <strong>Gut Index</strong>
                            <div class="mx-auto">Section ${section_course}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${gutsArr[0]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${gutsArr[1]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-2">
                            <div>${gutsArr[2]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${gutsArr[3]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${gutsArr[4]}</div>
                        </div>
                    </div>
                    <div class="m-auto py-1 justify-content-center row">
                        <div class="px-0 mr-3 text-center col-5" style="flex: 0 0 auto;">
                            <strong>Professor Rating</strong>
                            <div class="mx-auto">Section ${section_course}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${profsArr[0]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${profsArr[1]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-2">
                            <div>${profsArr[2]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${profsArr[3]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${profsArr[4]}</div>
                        </div>
                    </div>
                    <div class="m-auto py-1 justify-content-center row">
                        <div class="px-0 mr-3 text-center col-5" style="flex: 0 0 auto;">
                            <strong>Workload Rating</strong>
                            <div class="mx-auto">Section ${section_course}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${workArr[0]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${workArr[1]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-2">
                            <div>${workArr[2]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${workArr[3]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${workArr[4]}</div>
                        </div>
                    </div>
                    <div class="m-auto pt-4 pb-1 justify-content-end row">
                        <div class="px-0 me-3 text-center col-10" style="flex: 0 0 auto;">
                            <h5>${course.subject + " Subject Stats"}</h5>
                            <hr>
                        </div>

                        
                    </div>
                    <div class="m-auto pb-1 justify-content-center row">
                        <div class="d-flex justify-content-center px-0 mr-3 col-5"><span>Attribute</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-1"><span>Mean</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-1"><span>Median</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-2"><span>Standard Deviation</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-1"><span>Mode</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-1"><span>Range</span></div>

                    </div>
                    <div class="m-auto mt-1 py-1 justify-content-center row">
                        <div class="px-0 mr-3 text-center col-5" style="flex: 0 0 auto;">
                            <strong>${course.subject} Gut Index</strong>
                            
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${gutsArrSub[0]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${gutsArrSub[1]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-2">
                            <div>${gutsArrSub[2]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${gutsArrSub[3]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${gutsArrSub[4]}</div>
                        </div>
                    </div>
                    <div class="m-auto mt-1 py-1 justify-content-center row">
                        <div class="px-0 mr-3 text-center col-5" style="flex: 0 0 auto;">
                            <strong>${course.subject} Prof Rating</strong>
                           
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${profsArrSub[0]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${profsArrSub[1]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-2">
                            <div>${profsArrSub[2]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${profsArrSub[3]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${profsArrSub[4]}</div>
                        </div>
                    </div>
                    <div class="m-auto mt-1 py-1 justify-content-center row">
                        <div class="px-0 mr-3 text-center col-5" style="flex: 0 0 auto;">
                            <strong>${course.subject} Workload Rating</strong>
                        
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${workArrSub[0]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${workArrSub[1]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-2">
                            <div>${workArrSub[2]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${workArrSub[3]}</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-1">
                            <div>${workArrSub[4]}</div>
                        </div>
                    </div>

                </div>
                
            </div>
            `
            
            main_body.append(show_section)


            // COMMENTS SECTION
            const comments_section = document.createElement('section')
            comments_section.classList.add("comments")

            // handle comments html
            comments_section.innerHTML = 
            `
            <div class="container mt-5 mb-6" id="comments">
                <div class="d-flex justify-content-center row">
                    <div class="d-flex flex-column col-md-12">
                        <div class="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4">
                            
                            
                            <div class="d-flex flex-column ml-3">
                                <div class="d-flex flex-row post-title">
                                    <h5 id="comments-length">Comments (${course.comments.length})</h5>
                                </div>

                            </div>
                        </div>
                        <div class="coment-bottom bg-white p-2 px-3">
                            <form id="comment-form">
                                <div class="d-flex flex-row input-group mt-4 pb-4">
                                    <textarea class="form-control" placeholder="Add comment" aria-label="With textarea"></textarea>
                                    <button type="submit" class="btn btn-primary">Comment</button>
                                </div>
                            </form>
                            <div id="comments-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `

            main_body.append(comments_section)
            

            // ADD BACK BTN

            const btn = document.createElement('button')
            btn.classList.add('btn-primary')
            btn.classList.add('btn')
            btn.classList.add('mt-3')
            btn.type = "button"

            // add fcn to bring back table w/o page refresh
            // ensures that chosen season persists
            btn.onclick = () => { 
                main_body.innerHTML = ""
                refreshTable()
                table = document.querySelector('tbody#catalog-body')
    
                const curr_season = main_body.dataset.id
    
                renderNewSeasonHome(curr_season)
                const table_name = document.querySelector('main div h1#table-title')
    
                table_name.textContent = season_to_str(curr_season) + " Catalog"
        
             }
            btn.innerHTML = "Back to Catalog"

            const btn_container = document.querySelector('div#back-btn-container')

            btn_container.append(btn)


            // FETCH COMMENTS FROM API
            course.comments.forEach(comment => {

                fetch(`http://127.0.0.1:3000/comments/${comment.id}`)
                .then(r => r.json())
                .then(comment => {
                createOneComment(comment)
                })
            })

            // CREATE NEW COMMENT FORM

            const comment_form = document.querySelector('form#comment-form')

            // handle when comment is submitted
            comment_form.addEventListener('submit', event => {
                event.preventDefault()

                updateNumComments()

                const comments_div = document.querySelector('div#comments')

                const student_id = 1 // change later w/ auth

                const content = event.target[0].value

                const course_id = course.id

                const vote_score = 0

                const commentObj = {
                    student_id,
                    content, 
                    course_id,
                    vote_score
                }

                comment_form.reset()

                fetch('http://localhost:3000/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(commentObj)
                })
                    .then(r => r.json())
                    .then(createOneComment)
            })

            // HANDLE WHEN COMMENT IS UPDATED OR DELETED

            comments_section.addEventListener('click', event => {
                if (event.target.matches('button.edit-btn')) {

                    // comment being updated
                    const commented_section = event.target.closest("div.commented-section")
                    const comment = commented_section.querySelector('div.comment-content')

                    const curr_comment_content = comment.textContent

                    // create input field and fill in curr comment 
                    comment.innerHTML = `
                    <form id="update-form">
                        <div class="d-flex flex-row input-group mt-4 pb-4">
                            <textarea class="form-control" aria-label="With textarea">${curr_comment_content}</textarea>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </form>
                    `

                    const update_comment_form = document.querySelector('form#update-form')

                    // HANDLE WHEN COMMENT UPDATE FORM IS SUBMITTED
                    
                    update_comment_form.addEventListener('submit', event => {
                        event.preventDefault()

                        const box = update_comment_form.closest('div.comment-box')

                        const id = box.dataset.id

                        const new_comment_val = event.target[0].value

                        const new_comment_obj = { content: new_comment_val }

                        fetch(`http://localhost:3000/comments/${id}`, {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "Application/json",
                              "Accept": "Application/json"
                            },
                            body: JSON.stringify(new_comment_obj)
                          })
                          .then(r => r.json())
                          .then(updatedComment => {
                            comment.innerHTML = `
                            <div class="p-2 align-self-center col-lg comment-content" style="font-size:1.15rem; word-wrap: break-word; width: 54vmin;">${updatedComment.content}</div>
                            `
                          })
                    })
                }
                else if (event.target.matches('button.delete-btn')) {

                    // HANDLE WHEN COMMENT DELETED

                    const commented_section = event.target.closest("div.commented-section")

                    const box = commented_section.querySelector('div.comment-box')

                    const id = box.dataset.id 

                    commented_section.remove()

                    updateNumComments(true)

                    fetch(`http://localhost:3000/comments/${id}`, {
                        method: "DELETE"
                      })

                }
                //  HANDLE UPVOTE/DOWN VOTE
                else if (event.target.matches('i.upvote')) {
                    console.log("clicked")

                    const down = event.target.nextElementSibling.nextElementSibling

                    const curr_student_id = 1 // replace w/ session in future

                    fetch(`http://localhost:3000/students/${curr_student_id}`)
                        .then(r => r.json())
                        .then(student => {
                            // upvote is already cast, unclick it
                            if (event.target.classList.contains('active')) {
                                patchUpVote(event, down, student)
                                deleteVote(event, student)
        
                            } 
                            // downvote is cast, change to upvote
                            else if (down.classList.contains('active')) {
                                patchUpVote(event, down, student, true)
        
                            }
                            else {
                                createVote(event)
                            }
                        })
                }
                else if (event.target.matches('i.downvote')) {
                    console.log("clicked")

                    const up = event.target.previousElementSibling.previousElementSibling

                    const curr_student_id = 1 // replace w/ session in future

                    fetch(`http://localhost:3000/students/${curr_student_id}`)
                    .then(r => r.json())
                    .then(student => {
                        // downvote is already clicked, unclick it
                        if (event.target.classList.contains('active')) {
                            patchDownVote(event, up, student)
                            deleteVote(event, student)
    
                        } 
                        // upvote is already active, change to downvote
                        else if (up.classList.contains('active')) {
                            patchDownVote(event, up, student, true)

                        } 
                        // create new vote (no vote is cast already)
                        else {
                            createVote(event, true)
                        }
                    })
                }
            })
        })
    }
})