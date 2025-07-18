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
      
      const newuser = document.getElementById("AUser") ;
      newuser.addEventListener("submit" , (ev)=>{
      ev.preventDefault() ;
     const userId = document.getElementById("newUserId").value
     const title = document.getElementById("newUserTitle").value
     const body = document.getElementById("newUserBody").value
     if(!userId || !title || !body ){
      alert ("Please fill all Ententies !")
      return
     }
       fetch('https://jsonplaceholder.typicode.com/posts' , {
         method : 'POST', 
         body :JSON.stringify( {
            userId : userId ,
            title : title ,
            body  : body
         }) ,
         headers : {
            'Content-type' : 'application/json; charset=UTF-8'
         }
       })
         .then(data=>data.json())
         .then(newUser=>{
            const outerbox = document.getElementById("outerbox") ;
            const box = document.createElement("div") ;
            box.className ="innerbox" ;
            box.setAttribute("p-id" , newUser.id || userId)
            box.innerHTML = 
            `
          <p><strong>Id      :  </strong> <span>${newUser.id || userId}</span></p>
          <p><strong>userId  :  </strong> <span>${newUser.userId}</span></p>
          <p><strong> Title  :  </strong><span class="title-content">${newUser.title}</span></p>
          <p><strong>Body    :  </strong> <span class="body-content">${newUser.body}</span></p>
          <div class="box-btn">
          <button onclick="Update(this)" class="Update">Update</button>
          <button onclick="Delete(this)" class="Delete"> Delete</button>
          </div>
            `
            outerbox.appendChild(box);
            newuser.reset();
         })
         .catch((error)=>{
          console.log(`getting Error  ${error}`)
         })
      })