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

 const submitform=async(event)=>
{
    event.preventDefault();
    
   const obj={
          description:inputid.value,
          brow:browseid.value,
          sele:selectid.value
   }
   try{
     var savedta= await axios.post("https://crudcrud.com/api/48b9b392a0594d96904832226c468e85/ExpenseTracker",obj)
     
        showListofRegisteredUser(savedta.data)
        console.log(savedta.data)
    
    }
     catch{(err)=>{
        document.body.innerHTML=document.body.innerHTML+ "<h4>something went wrong </h4>";
        console.log(err)
     }}
   //localStorage.setItem(obj.description,JSON.stringify(obj))
  


   //clear fields 
   inputid.value='';
     browseid.value='';
    selectid.value='';
}

function showListofRegisteredUser(user)
{
    const parentNode = document.getElementById('userlist');
    const createNewUserHtml = `<li id='${user._id}'>${user.description} - ${user.brow} - ${user.sele}
                                    <button onclick=deleteUser('${user._id}')>Delete</button>
                                    <button onclick=EditUser('${user.description}','${user.brow}','${user.sele}','${user._id}')>Edit</button>
                                </li>`
    console.log(createNewUserHtml)
    parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
    console.log(parentNode.innerHTML)
}


const win= window.addEventListener('load',async(user) => {
    // Object.keys(localStorage).forEach(key => {
    //     const user = JSON.parse(localStorage.getItem(key))

    
    try{
       const getta= await axios.get("https://crudcrud.com/api/48b9b392a0594d96904832226c468e85/ExpenseTracker")
        for(let i=0;i<getta.data.length;i++){
        showListofRegisteredUser(getta.data[i])
        }
    }
       catch{(err)=>{
        document.body.innerHTML=document.body.innerHTML+ "<h4>something went wrong </h4>";
        console.log(err);
       
       }}
    })



const deleteUser=async(userid)=> {
    try{
   await axios.delete(`https://crudcrud.com/api/48b9b392a0594d96904832226c468e85/ExpenseTracker/${userid}`)
        removeItemFromScreen(userid)
    }
    catch{(err)=>{
        console.log(err)
    }
    //localStorage.removeItem(user)
   
}
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