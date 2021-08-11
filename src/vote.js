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

function patchUpVote(event, downvoteEle, student, decrease=false) {
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

    const allVoteEles = box.getElementsByTagName('li')

    console.log(allVoteEles)

    // const voteEle = allVoteEles.find(voteEle => {
    //     voteEle.innerText === student.id
    // })

    let student_ids = []
    let vote_ids = []
    


    for (let i = 0; i < allVoteEles.length; i++) {
        // console.log(allVoteEles[i].textContent)
        // console.log(allVoteEles[i].dataset.id)
        // if (allVoteEles[i].textContent === student.id) {
            
        // }
       student_ids.push(parseInt(allVoteEles[i].textContent))
       vote_ids.push(allVoteEles[i].dataset.id)
        // console.log(allVoteEles[i].dataset.id)

    }

    // console.log(student_ids)

    const vote_id_index = student_ids.indexOf(parseInt(student.id))

    



    // allVoteEles.forEach(element => {
    //     if (element.getAttribute('innerText') === student.id) {
    //         voteId = element.getAttribute('data-id')
    //         console.log(voteEle)
    //     }
    // });
    // console.log(voteEle)

    fetch(`http://localhost:3000/votes/${vote_ids[vote_id_index]}`, {
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