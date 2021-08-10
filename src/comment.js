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


function createOneComment(commentObj) {


    fetch(`http://127.0.0.1:3000/comments/${commentObj.id}`)
    .then(r => r.json())
    .then(commentObj => {
        const outerDiv = document.querySelector("div#comments-container")

        const newComment = document.createElement('div')
    
        newComment.classList.add('commented-section')
        newComment.classList.add('mt-2')

        let vote_ids = commentObj.votes.map(vote => vote.id).toString()
    
        newComment.innerHTML = `
        <hr>
        <div class="d-flex flex-row align-items-center commented-user">
            <h5 class="mb-3 ps-2">Kyle Andruczk</h5>
        </div>
                
            <div class="d-flex bg-light py-3 px-2 comment-box" data-id="${commentObj.id}">
                <div class="p-2 me-2 align-self-center" id="votes" data-id="${vote_ids}" style= "align-items: stretch !important;">
                    <i style="display: block; font-size: 20px; color: #adb5bd;" class="upvote bi bi-caret-up-square"></i>
                    <span class="text-secondary num-votes" style="display: block; font-size: 20px; text-align: center;">0</span>
                    <i style="display: block; font-size: 20px; color: #adb5bd;" class="downvote bi bi-caret-down-square"></i>
                    
                </div>
                <div class="p-2 align-self-center col-lg comment-content" style="font-size:1.15rem; word-wrap: break-word; width: 54vmin;">${commentObj.content}</div>
                
            </div>
    
            
            
     
        <br>
        <div class="container">
            <div class="row">
                <div class= "col">
                    <span class="mb-1 ms-2">5 hours ago</span>
                    <button type="button" class="btn btn-primary btn-sm edit-btn">Edit</button>
                    <button type="button" class="btn btn-secondary btn-sm delete-btn">Delete</button>
                </div>
            </div>
                
    
        </div>
    
        
    
        `
        
        outerDiv.append(newComment)
    })



    
}