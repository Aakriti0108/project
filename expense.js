
const button=document.getElementById('submit');
const inputid=document.getElementById('typeid');
const browseid=document.getElementById('browserid');
const selectid=document.getElementById('selectid');
const message=document.querySelector('.mesg');


//   button.addEventListener('mouseover', e => {
//     e.preventDefault();
//     console.log(e.target.className);
//     document.getElementById('my-form').style.background = '#bbb';
//     document.querySelector('body').classList.add('bg-light');
   
//   });

function submitform(event)
{
    event.preventDefault();
    
   const obj={
          description:inputid.value,
          brow:browseid.value,
          sele:selectid.value
   }
     axios.post("https://crudcrud.com/api/427c3305d3f143e5a518c0c22de6243f/ExpenseTracker",obj)
     .then((response)=>{
        showListofRegisteredUser(response.data)
        console.log(response)
     })
     .catch((err)=>{
        document.body.innerHTML=document.body.innerHTML+ "<h4>something went wrong </h4>";
        console.log(err)
     })
   //localStorage.setItem(obj.description,JSON.stringify(obj))
  


   //clear fields 
   inputid.value='';
     browseid.value='';
    selectid.value='';
}

function showListofRegisteredUser(user){
    const parentNode = document.getElementById('userlist');
    const createNewUserHtml = `<li id='${user._id}'>${user.description} - ${user.brow} - ${user.sele}
                                    <button onclick=deleteUser('${user._id}')>Delete</button>
                                    <button onclick=EditUser('${user.description}','${user.brow}','${user.sele}','${user._id}')>Edit</button>
                                </li>
                                `
    console.log(createNewUserHtml)
    parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
    console.log(parentNode.innerHTML)
}


window.addEventListener('load', (user) => {
    // Object.keys(localStorage).forEach(key => {
    //     const user = JSON.parse(localStorage.getItem(key))

    axios.get("https://crudcrud.com/api/427c3305d3f143e5a518c0c22de6243f/ExpenseTracker")
    .then((response)=>{
        for(let i=0;i<response.data.length;i++){
        showListofRegisteredUser(response.data[i])
        }
    })
       .catch((err)=>{
        document.body.innerHTML=document.body.innerHTML+ "<h4>something went wrong </h4>";
        console.log(err);
       })
    })



function deleteUser(userid) {
    axios.delete(`https://crudcrud.com/api/427c3305d3f143e5a518c0c22de6243f/ExpenseTracker/${userid}`)
    .then((respone)=>{
        removeItemFromScreen(userid)
    })
    .catch((err)=>{
        console.log(err)
    })
    //localStorage.removeItem(user)
   
}

function removeItemFromScreen(userid){
    const parentNode = document.getElementById('userlist');
    const elem = document.getElementById(userid)
    parentNode.removeChild(elem);
}
function EditUser(description,brow,sele,userid) 
{
   
    inputid.value=description;
     browseid.value=brow;
    selectid.value=sele;
    deleteUser(userid);
}



