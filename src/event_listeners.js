let table = document.querySelector('tbody#catalog-body')
const seasons_dropdown = document.querySelector('ul#seasons-btn')
const main_body = document.querySelector('div#main-body')
const searchForm = document.querySelector('form#searchForm')

const OFFSET = 150


seasons_dropdown.addEventListener('click', event => {
    if (event.target.matches('li.season')) {
        const season = parseInt(event.target.dataset.id)

        const table_name = document.querySelector('main div h1#table-title')

        table_name.textContent = season_to_str(season) + " Catalog"

        table.innerHTML = ""

        renderNewSeasonHome(season)
    }
})

main_body.addEventListener('click', event => {
    if (event.target.matches('tbody td')) {
        const tr = event.target.closest('tr')
        const id = tr.dataset.id
        console.log(id)
        main_body.innerHTML = ""


        const btn = document.createElement('a')
        btn.classList.add('btn-primary')
        btn.classList.add('btn')
        btn.classList.add('mb-3')
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

        main_body.append(btn)

        const table_name = document.querySelector('main div h1#table-title')

        const comments_section = document.createElement('section')

        comments_section.classList.add("comments")


    
        


        clicked_course = getOneCourse(id)

        // console.log(clicked_course)

        clicked_course.then(course => {

            table_name.textContent = course.title + ` (${season_to_str(course.season_code)})`

            table_name.dataset.id = id

            const section = document.createElement('section')

            console.log(course.syllabus_url)

            let syll_url;

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

     

            if (course.syllabus_url === null) {
                syll_url = `
                    <div class="CourseModalOverview_metadata__2fCzj col-sm-9 col-8">
                        <div class="px-0 col-sm-3 col-4"><span>N/A</span></div>
                    </div>
                `
            }
            else {
                syll_url = `
                <div class="CourseModalOverview_metadata__2fCzj col-sm-9 col-8">
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

            const meets = checkIfBlank(course, "times_summary", true)

            const location = checkIfBlank(course, "locations_summary", true)


    

            section.innerHTML = 


            `
            <div class="m-auto row">
                <div class="px-0 mt-0 mb-3 col-md-5">
                    <div class="mx-auto row">
                        <div class="LinesEllipsis  " style="white-space: pre-wrap;">${course.description}<wbr></div>
                    </div>
                    <div class="m-auto pt-4 pb-2 row">
                        <div class="px-0 col-sm-3 col-4"><span class="CourseModalOverview_lable_bubble__20zUT">Syllabus</span></div>
                        ${syll_url}
                    </div>
                    <div class="m-auto py-2 row">
                        <div class="px-0 col-sm-3 col-4"><span class="CourseModalOverview_lable_bubble__20zUT">Professor</span></div>
                        <div class="CourseModalOverview_metadata__2fCzj col-sm-9 col-8"><span class="sc-jrQzUz jUiVDr">${course.professor_names}</span></div>
                    </div>
                    <div class="m-auto py-2 row">
                        <div class="px-0 col-sm-3 col-4"><span class="CourseModalOverview_lable_bubble__20zUT">Meets</span></div>
                        <div class="CourseModalOverview_metadata__2fCzj col-sm-9 col-8">${meets}</div>
                    </div>
                    <div class="m-auto py-2 row">
                        <div class="px-0 col-sm-3 col-4"><span class="CourseModalOverview_lable_bubble__20zUT">Location</span></div>
                        <div class="CourseModalOverview_metadata__2fCzj col-sm-9 col-8">${location}</div>
                    </div>
                    <div class="m-auto py-2 row">
                        <div class="px-0 col-sm-3 col-4"><span class="CourseModalOverview_lable_bubble__20zUT">Section</span></div>
                        <div class="CourseModalOverview_metadata__2fCzj col-sm-9 col-8">1</div>
                    </div>
                    <div class="m-auto py-2 row">
                        <div class="px-0 col-sm-3 col-4"><span class="CourseModalOverview_lable_bubble__20zUT">Enrollment</span></div>
                        <div class="CourseModalOverview_metadata__2fCzj col-sm-9 col-8">75</div>
                    </div>
                    <div class="m-auto py-2 row">
                        <div class="px-0 col-sm-3 col-4"><span class="CourseModalOverview_lable_bubble__20zUT">Credits</span></div>
                        <div class="CourseModalOverview_metadata__2fCzj col-sm-9 col-8">1</div>
                    </div>
                </div>
                <div class="px-0 my-0 col-md-7">
                    <div class="m-auto pb-1 justify-content-center row">
                        <div class="d-flex justify-content-center px-0 mr-3 col-5"><span class="CourseModalOverview_evaluation_header__3tqxo">Season</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-2"><span class="CourseModalOverview_evaluation_header__3tqxo">Class</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-2"><span class="CourseModalOverview_evaluation_header__3tqxo">Prof</span></div>
                        <div class="d-flex ml-0 justify-content-center px-0 col-2"><span class="CourseModalOverview_evaluation_header__3tqxo">Work</span></div>
                    </div>
                    <div class="m-auto py-1 justify-content-center row">
                        <div class="sc-bTfYlY cEVPjL CourseModalOverview_rating_bubble__31UGC  px-0 mr-3 text-center col-5" style="flex: 0 0 auto;">
                            <strong>Fall 2019</strong>
                            <div class="CourseModalOverview_details__3Yi_F mx-auto CourseModalOverview_shown__po4mh">Section 1</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-2">
                            <div class="sc-pVTma hTudOk CourseModalOverview_rating_cell__3jrJ6 undefined">3.9</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-2">
                            <div class="sc-pVTma dmsDBh CourseModalOverview_rating_cell__3jrJ6">4.0</div>
                        </div>
                        <div class="px-1 ml-0 d-flex justify-content-center text-center col-2">
                            <div class="sc-pVTma bUlwbR CourseModalOverview_rating_cell__3jrJ6">3.3</div>
                        </div>
                    </div>
                </div>
            </div>
            `
            


            main_body.append(section)
            main_body.append(comments_section)
            // main_body.append(new_comment)





            course.comments.forEach(comment => {
                createOneComment(comment.id)
            })

            const comment_form = document.querySelector('form#comment-form')

            comment_form.addEventListener('submit', event => {
                event.preventDefault()

                updateNumComments()



                const comments_div = document.querySelector('div#comments')

                const student_id = 1

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

            comments_section.addEventListener('click', event => {
                if (event.target.matches('button.edit-btn')) {

                    const commented_section = event.target.closest("div.commented-section")


                    const box = commented_section.querySelector('div.comment-box')

                    // const id = box.dataset.id

                    

                    const comment = commented_section.querySelector('div.comment-content')

                    const curr_comment_content = comment.textContent

                    comment.innerHTML = `
                    <form id="update-form">
                        <div class="d-flex flex-row input-group mt-4 pb-4">
                            <textarea class="form-control" aria-label="With textarea">${curr_comment_content}</textarea>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </form>
                    `

                    const update_comment_form = document.querySelector('form#update-form')

                    update_comment_form.addEventListener('submit', event => {
                        event.preventDefault()

                        const box = update_comment_form.closest('div.comment-box')

                        const id = box.dataset.id

                        const new_comment_val = event.target[0].value

                        console.log(id)
                        console.log(box)


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
                            comment.innerHTML = `<div class="p-2 align-self-center col-lg comment-content" style="font-size:1.15rem; word-wrap: break-word; width: 54vmin;">${updatedComment.content}</div>`
                          })


                    })


                }
                else if (event.target.matches('button.delete-btn')) {

                    const commented_section = event.target.closest("div.commented-section")

                    const box = commented_section.querySelector('div.comment-box')

                    const id = box.dataset.id 

                    commented_section.remove()

                    updateNumComments(true)

                    fetch(`http://localhost:3000/comments/${id}`, {
                        method: "DELETE"
                      })

                }
                else if (event.target.matches('i.upvote')) {
                    console.log("clicked")

                    const down = event.target.nextElementSibling.nextElementSibling



                    if (event.target.classList.contains('active')) {
                        patchUpVote(event, down)

                    } 
                    else if (down.classList.contains('active')) {
                        patchUpVote(event, down, true)

                    }
                    else {
                        createVote(event)
                    }
                    





                }
                else if (event.target.matches('i.downvote')) {
                    console.log("clicked")

                    const up = event.target.previousElementSibling.previousElementSibling

                    if (event.target.classList.contains('active')) {
                        patchDownVote(event, up)

                    } 
                    else if (up.classList.contains('active')) {
                        patchDownVote(event, up, true)

                    } else {
                    createVote(event, true)
                    }





                }
            })





        })
    }
})