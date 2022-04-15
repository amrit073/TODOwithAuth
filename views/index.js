window.onload = () => {
 
  const form1 = document.querySelector("#addForm");
  let submit = document.getElementById("submit");
  let insidelist = document.getElementById('items')
  form1.addEventListener("submit", fetchnadd);
  insidelist.addEventListener("click", list_ma);

};

const deletethis = (taskId) =>{
document.getElementsByClassName(taskId)[0].remove()
}




const fetchnadd = async (e) => {
  e.preventDefault();
  const gid = document.getElementsByTagName('body')[0].getAttribute('id')
  let newItem = document.getElementById("item").value;
  fetch('/api/v1/add', {
    method: 'POST',
    
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify({ gid: gid, task: newItem })
  }).then(resp => resp.json()).then((res) => {
    inithtml = document.getElementById('items').innerHTML
    // if (res.isCompleted) { hide = 'hide'; bg = 'bg' }
    to_add = `<li class="list-group-item  ${res._id} ">${newItem}<button class="btn-danger btn btn-sm float-right delete" name="${res._id}">Delete</button>
    <button class="btn-success btn btn-sm float-right done" name="${res._id}">DONE</button></li>`
    document.getElementById('items').innerHTML = to_add + inithtml

    
  }).then(document.getElementById("item").value='')
  .catch((err) => { console.log(err); });
  
  
}

const list_ma = async (e) => {
   e.preventDefault();
 
const gid = document.getElementsByTagName('body')[0].getAttribute('id')
  if (e.target.classList.contains("delete")) {
    taskId = e.target.name
    fetch('/api/v1/delete', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ gid: gid, taskid: taskId })
    }
    ).then(res=>console.log('deleted')
    ).then(deletethis(taskId)
    ).then(document.getElementById("item").value='')
    .catch(err=>console.log(err)
    )
  }
    
  if (e.target.classList.contains("done")) {
    taskId = e.target.name
    
    fetch('/api/v1/update', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ gid: gid, taskid: taskId })
    }
    ).then(res=>res.json()
    ).then((data)=>console.log(data)
    ).then(()=>{document.getElementsByClassName(taskId)[0].classList.add('bg')
    document.getElementsByName(taskId)[1].classList.add('hide')}
    ).then(document.getElementById("item").value='')
    .catch(err=>console.log(err))
  }
}


function toggleButton(ref, btnID) {
  document.getElementById(btnID).disabled = false;
}