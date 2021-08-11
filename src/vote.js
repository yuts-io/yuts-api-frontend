function updateVoteScore(comment_id, newVotes) {

    

    fetch(`http://localhost:3000/comments/${comment_id}/changeVotes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
          "Accept": "Application/json"
        },
        body: JSON.stringify({
          vote_score: newVotes
        })
    })
}

function patchUpVote(event, downvoteEle, decrease=false) {
    const num_votes_ele = event.target.nextElementSibling

    let num_votes = parseInt(num_votes_ele.textContent)

   decrease ? num_votes += 2 : num_votes -= 1

    num_votes_ele.innerHTML = ""
    num_votes_ele.innerText = num_votes

    event.target.classList.remove("bi-caret-up-square-fill")
    event.target.classList.add("bi-caret-up-square")
    event.target.classList.remove("active")
    event.target.style.color = "#adb5bd"

    if (decrease) {


        downvoteEle.classList.remove("bi-caret-down-square-fill")
        downvoteEle.classList.add("bi-caret-down-square")
        downvoteEle.classList.remove("active")
        downvoteEle.style.color = "#adb5bd"

        event.target.classList.remove("bi-caret-up-square")
        event.target.classList.add("bi-caret-up-square-fill")
        event.target.classList.add("active")
        event.target.style.color = "#0d6efd" 
        

    }
    
    const box = event.target.closest("div.comment-box")

    const course_id = box.dataset.id 

    updateVoteScore(course_id, num_votes)


    let upvote;

    if (decrease) {
        upvote = false
    } else {
        upvote = null
    }


    const voteObj = {
        upvote
    }

    fetch(`http://localhost:3000/votes/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
          "Accept": "Application/json"
        },
        body: JSON.stringify(voteObj)
      })


}

function patchDownVote(event, upvoteEle, increase=false) {
    const num_votes_ele = event.target.previousElementSibling

    let num_votes = parseInt(num_votes_ele.textContent)

   increase ? num_votes -= 2 : num_votes += 1

    num_votes_ele.innerHTML = ""
    num_votes_ele.innerText = num_votes

    event.target.classList.remove("bi-caret-down-square-fill")
    event.target.classList.add("bi-caret-down-square")
    event.target.classList.remove("active")
    event.target.style.color = "#adb5bd"

    if (increase) {


        upvoteEle.classList.remove("bi-caret-up-square-fill")
        upvoteEle.classList.add("bi-caret-up-square")
        upvoteEle.classList.remove("active")
        upvoteEle.style.color = "#adb5bd"

        event.target.classList.remove("bi-caret-down-square")
        event.target.classList.add("bi-caret-down-square-fill")
        event.target.classList.add("active")
        event.target.style.color = "#0d6efd" 
        

    }
    
    const box = event.target.closest("div.comment-box")

    const course_id = box.dataset.id 

    updateVoteScore(course_id, num_votes)


    let upvote;

    if (increase) {
        upvote = false
    } else {
        upvote = null
    }


    const voteObj = {
        upvote
    }

    fetch(`http://localhost:3000/votes/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
          "Accept": "Application/json"
        },
        body: JSON.stringify(voteObj)
      })


}

function createVote(event, downvote=false) {
    let num_votes_ele;

    downvote ? num_votes_ele = event.target.previousElementSibling : num_votes_ele = event.target.nextElementSibling

    num_votes = parseInt(num_votes_ele.textContent)

    downvote ? num_votes -= 1 : num_votes += 1

    num_votes_ele.innerHTML = ""
    num_votes_ele.innerText = num_votes

    if (downvote) {
        event.target.classList.remove("bi-caret-down-square")
        event.target.classList.add("bi-caret-down-square-fill")
        event.target.classList.add("active")
        event.target.style.color = "#0d6efd"
    } else {
        event.target.classList.remove("bi-caret-up-square")
        event.target.classList.add("bi-caret-up-square-fill")
        event.target.classList.add("active")
        event.target.style.color = "#0d6efd"
        
        
    }
    
    const box = event.target.closest("div.comment-box")

    const comment_id = box.dataset.id 

    const table_name = document.querySelector('main div h1#table-title')

    const course_id = table_name.dataset.id

    updateVoteScore(comment_id, num_votes)

    

    const student_id = 1

    let upvote;

    downvote ? upvote = false : upvote = true

    const voteObj = {
        comment_id,
        student_id, 
        upvote
    }

    fetch('http://localhost:3000/votes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteObj)
    })

}