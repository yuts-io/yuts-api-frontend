// UPDATE A COMMENT'S VOTE SCORE
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

// HANDLE UPVOTE EVENT
function patchUpVote(event, downvoteEle, student, increased_score=false) {
    const num_votes_ele = event.target.nextElementSibling

    let num_votes = parseInt(num_votes_ele.textContent)

    increased_score ? num_votes += 2 : num_votes -= 1

    // clear num votes and update it 
    num_votes_ele.innerHTML = ""
    num_votes_ele.innerText = num_votes

    // remove the upvote filled caret
    event.target.classList.remove("bi-caret-up-square-fill")
    event.target.classList.add("bi-caret-up-square")
    event.target.classList.remove("active")
    event.target.style.color = "#adb5bd"

    // handle when downvote already is active
    if (increased_score) {
        downvoteEle.classList.remove("bi-caret-down-square-fill")
        downvoteEle.classList.add("bi-caret-down-square")
        downvoteEle.classList.remove("active")
        downvoteEle.style.color = "#adb5bd"

        event.target.classList.remove("bi-caret-up-square")
        event.target.classList.add("bi-caret-up-square-fill")
        event.target.classList.add("active")
        event.target.style.color = "#0d6efd" 
    }
    
    // get comment id
    const box = event.target.closest("div.comment-box")
    const comment_id = box.dataset.id 

    // change comment 
    updateVoteScore(comment_id, num_votes)

    // create new upvote object
    let upvote;
    if (increased_score) {
        upvote = true
    } else {
        upvote = null
    }
    const voteObj = {
        upvote
    }

    // find all the vote elements, then match vote id to student id
    const allVoteEles = box.getElementsByTagName('li')

    let student_ids = []
    let vote_ids = []
    // interate thru eles, store ids in arrs 
    for (let i = 0; i < allVoteEles.length; i++) {
       student_ids.push(parseInt(allVoteEles[i].textContent))
       vote_ids.push(allVoteEles[i].dataset.id)
    }

    // find student id index
    const vote_id_index = student_ids.indexOf(parseInt(student.id))

    // fetch the right vote id, patch it
    fetch(`http://localhost:3000/votes/${vote_ids[vote_id_index]}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
          "Accept": "Application/json"
        },
        body: JSON.stringify(voteObj)
    })
}

// HANDLE DOWN VOTE EVENT
function patchDownVote(event, upvoteEle, student, decrease_score=false) {
    const num_votes_ele = event.target.previousElementSibling

    let num_votes = parseInt(num_votes_ele.textContent)

    decrease_score ? num_votes -= 2 : num_votes += 1
    
    // clear num votes and update it 
    num_votes_ele.innerHTML = ""
    num_votes_ele.innerText = num_votes

    // remove the upvote filled caret
    event.target.classList.remove("bi-caret-down-square-fill")
    event.target.classList.add("bi-caret-down-square")
    event.target.classList.remove("active")
    event.target.style.color = "#adb5bd"

    // handle when upvote already is active
    if (decrease_score) {
        upvoteEle.classList.remove("bi-caret-up-square-fill")
        upvoteEle.classList.add("bi-caret-up-square")
        upvoteEle.classList.remove("active")
        upvoteEle.style.color = "#adb5bd"

        event.target.classList.remove("bi-caret-down-square")
        event.target.classList.add("bi-caret-down-square-fill")
        event.target.classList.add("active")
        event.target.style.color = "#0d6efd" 
    }
    
    // get comment id
    const box = event.target.closest("div.comment-box")
    const comment_id = box.dataset.id 

    // change comment 
    updateVoteScore(comment_id, num_votes)

    // create new upvote object
    let upvote;
    if (decrease_score) {
        upvote = false
    } else {
        upvote = null
    }
    const voteObj = {
        upvote
    }

    // find all the vote elements, then match vote id to student id
    const allVoteEles = box.getElementsByTagName('li')

    let student_ids = []
    let vote_ids = []
    // interate thru eles, store ids in arrs 
    for (let i = 0; i < allVoteEles.length; i++) {
       student_ids.push(parseInt(allVoteEles[i].textContent))
       vote_ids.push(allVoteEles[i].dataset.id)
    }

    // find student id index
    const vote_id_index = student_ids.indexOf(parseInt(student.id))

    // fetch the right vote id, patch it
    fetch(`http://localhost:3000/votes/${vote_ids[vote_id_index]}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
          "Accept": "Application/json"
        },
        body: JSON.stringify(voteObj)
    })
}

// CREATE A NEW VOTE
function createVote(event, downvote=false) {

    let num_votes_ele;
    downvote ? num_votes_ele = event.target.previousElementSibling : num_votes_ele = event.target.nextElementSibling

    let num_votes = parseInt(num_votes_ele.textContent)
    downvote ? num_votes -= 1 : num_votes += 1

    // clear votes, update them 
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
    
    // update the comment score
    const box = event.target.closest("div.comment-box")
    const comment_id = box.dataset.id 
    updateVoteScore(comment_id, num_votes)

    
    // create new voteObj
    const student_id = 1 // change w/ session in the future
    let upvote;
    downvote ? upvote = false : upvote = true
    const voteObj = {
        comment_id,
        student_id, 
        upvote
    }

    // CREATE POST FOR VOTE
    fetch('http://localhost:3000/votes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteObj)
    })
    .then(r => r.json())
    .then(vote => {
        // add new vote to hidden ul
        const list = document.querySelector(`ul#comment-${comment_id}`)
        const li = document.createElement('li')

        li.classList.add('vote-id')
        li.dataset.id = vote.id
        li.id = `student-${student_id}`
        li.textContent = vote.student_id

        list.append(li)
    })
}

// DELETE A VOTE
function deleteVote(event, student) {

    const box = event.target.closest("div.comment-box")
    const allVoteEles = box.getElementsByTagName('li')

    let student_ids = []
    let vote_ids = []
    // interate thru eles, store ids in arrs 
    for (let i = 0; i < allVoteEles.length; i++) {
       student_ids.push(parseInt(allVoteEles[i].textContent))
       vote_ids.push(allVoteEles[i].dataset.id)
    }

    // find student id index
    const vote_id_index = student_ids.indexOf(parseInt(student.id))
    const comment_id = box.dataset.id 
    
    // remove deleted vote
    const list = document.querySelector(`ul#comment-${comment_id}`)
    const deleted_vote = list.querySelector(`li:nth-child(${vote_id_index + 1})`)
    deleted_vote.remove()

    fetch(`http://localhost:3000/votes/${vote_ids[vote_id_index]}`, {
        method: "DELETE"
    })
}