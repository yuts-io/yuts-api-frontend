// HANDLE WHEN COMMENT IS ADDED OR DELETED, CHANGE NUM COMMENTS LISTED
function updateNumComments(decrease=false) {
    const comments_counter = document.querySelector('h5#comments-length')
    let new_num_comments = comments_counter.textContent
    if (decrease) {
        new_num_comments = parseInt(new_num_comments.charAt(new_num_comments.length - 2)) - 1
    } else {
        new_num_comments = parseInt(new_num_comments.charAt(new_num_comments.length - 2)) + 1
    }
    comments_counter.innerHTML = ""
    comments_counter.textContent = `Comments (${new_num_comments})`
}

// HANDLE NEW COMMENT CREATION
function createOneComment(commentObj) {
    const outerDiv = document.querySelector("div#comments-container")

    const newComment = document.createElement('div')

    newComment.classList.add('commented-section')
    newComment.classList.add('mt-2')

    // FETCH STUDENT TO DYNAMICALLY ADD NAME ON COMMENT
    fetch(`http://127.0.0.1:3000/students/${commentObj.student_id}`)
    .then(r => r.json())
    .then(student => {
        newComment.innerHTML = 
        `
            <hr>
            <div class="d-flex flex-row align-items-center commented-user" data-id="${student.id}">
                <h5 class="mb-3 ps-2">${student.first_name + " " + student.last_name}</h5>
            </div>
                    
                <div class="d-flex bg-light py-3 px-2 comment-box" data-id="${commentObj.id}">
                    <div class="p-2 me-2 align-self-center" id="votes" style= "align-items: stretch !important;">
                        <i style="display: block; font-size: 20px; color: #adb5bd;" class="upvote bi bi-caret-up-square"></i>
                        <span class="text-secondary num-votes" style="display: block; font-size: 20px; text-align: center;">${commentObj.vote_score}</span>
                        <i style="display: block; font-size: 20px; color: #adb5bd;" class="downvote bi bi-caret-down-square"></i>
                        
                    </div>
                    <div class="p-2 align-self-center col-lg comment-content" style="font-size:1.15rem; word-wrap: break-word; width: 54vmin;">${commentObj.content}</div>
                    <ul hidden class="votes-list" id="comment-${commentObj.id}">
                    </ul> 
                    
                </div>
            <br>
            <div class="container">
                <div class="row">
                    <div class= "col">
                        
                        <span class="mb-1 ms-2 me-1">${commentObj.created_at}<! –– add comment time later ––></span> 
                        <button type="button" class="btn btn-primary btn-sm edit-btn me-1">Edit</button>
                        <button type="button" class="btn btn-secondary btn-sm delete-btn me-1">Delete</button>
                    </div>
                </div>
            </div>
        `
            
        outerDiv.append(newComment)

        const list = document.querySelector(`ul#comment-${commentObj.id}`)

        // ADD VOTES TO COMMENTS
        // FETCH VOTES FROM API
        if (commentObj.votes != null) {
            commentObj.votes.forEach(vote => {
                fetch(`http://127.0.0.1:3000/votes/${vote.id}`)
                .then(r => r.json())
                .then(vote => {
                    const li = document.createElement('li')

                    li.classList.add('vote-id')

                    li.dataset.id = vote.id

                    li.id = `student-${student.id}`

                    li.textContent = vote.student_id

                    list.append(li)
                    // find vote id, match it to student
                    // change vote style accordingly
                    if (vote.student_id === student.id) {
                        if (vote.upvote) {
                            const up = list.previousElementSibling.previousElementSibling.querySelector('i.upvote')
                            up.classList.remove("bi-caret-up-square")
                            up.classList.add("bi-caret-up-square-fill")
                            up.classList.add("active")
                            up.style.color = "#0d6efd"
                        }
                        else if (vote.upvote === false) {
                            const down = list.previousElementSibling.previousElementSibling.querySelector('i.downvote')
                            down.classList.remove("bi-caret-down-square")
                            down.classList.add("bi-caret-down-square-fill")
                            down.classList.add("active")
                            down.style.color = "#0d6efd"
                        }
                    }
                })
            })
        }  
    })    
}

