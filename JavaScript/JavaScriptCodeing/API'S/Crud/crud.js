  let currentUser = null ;
     fetch('https://jsonplaceholder.typicode.com/posts')
     .then(data=>data.json())
     .then(users=>
        document.getElementById("outerbox").innerHTML = users.map((user)=>
        `
        <div class="innerbox" p-id="${user.id}">  
        <p><strong>Id      :  </strong> <span>${user.id}</span></p>
        <p><strong>userId  :  </strong> <span>${user.userId}</span></p>
        <p><strong> Title  :  </strong><span class="title-content">${user.title}</span></p>
        <p><strong>Body    :  </strong> <span class="body-content">${user.body}</span></p>
         <div class="box-btn">
        <button onclick="Update(this)" class="Update">Update</button>
        <button onclick="Delete(this)" class="Delete"> Delete</button>
        </div>
        </div>
        `).join('')
     )
      function Delete(User){
         const delUser = User.closest(".innerbox")
         const delId = delUser.getAttribute("p-id")
         const del = confirm(`Are You Sure to Delete User ${delId}`)
         if(del){
            delUser.remove() ;
            alert(`You Delete User Having Id ${delId}`)
         }
      }
      function Update(nUser) {
       currentUser = nUser.closest(".innerbox")
      const Title = currentUser.querySelector(".title-content").innerText
      const Body = currentUser.querySelector(".body-content").innerText
      document.getElementById("title").value = Title ;
      document.getElementById("body").value = Body ;
      document.getElementById("model").style.display = 'flex'
      }
      function Save(){
        const newTitle = document.getElementById("title").value ;
        const newBody  =  document.getElementById("body").value ;
        currentUser.querySelector(".title-content").innerText = newTitle ;
        currentUser.querySelector(".body-content").innerText = newBody ;
        document.getElementById("model").style.display = 'none'
      }
      function cancel(){
        document.getElementById("model").style.display = 'none'
      }