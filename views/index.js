window.onload = () => {
  const form1 = document.querySelector("#addForm");

  let items = document.getElementById("items");
  let submit = document.getElementById("submit");

  let editItem = null;

  form1.addEventListener("submit", fetchnadd);
  items.addEventListener("click", removeItem);

};


const fetchnadd = async (e) => {
  e.preventDefault();
  let newItem = document.getElementById("item").value;
  let gid = document.getElementsByTagName('body')[0].getAttribute('id')
  res = await fetch('/api/v1/add', {
    method:'POST',
    body: {"gid":gid, "task":newItem}
  }).then(resp => console.log(resp))
  
  
}

const removeItem= async (e) => {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you Sure?")) {
      let li = e.target.parentNode;
      items.removeChild(li);
      document.getElementById("lblsuccess").innerHTML
        = "Text deleted successfully";

      document.getElementById("lblsuccess")
        .style.display = "block";

      setTimeout(function () {
        document.getElementById("lblsuccess")
          .style.display = "none";
      }, 3000);
    }
  }
  if (e.target.classList.contains("edit")) {
    document.getElementById("item").value =
      e.target.parentNode.childNodes[0].data;
    submit.value = "EDIT";
    editItem = e;
  }
}

function toggleButton(ref, btnID) {
  document.getElementById(btnID).disabled = false;
}
