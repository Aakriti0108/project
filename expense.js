


const button=document.getElementById('submit');
const inputid=document.getElementById('typeid');
const browseid=document.getElementById('browserid');
const selectid=document.getElementById('selectid');
const message=document.querySelector('.mesg');
button.addEventListener('click',addItem)


  button.addEventListener('mouseover', e => {
    e.preventDefault();
    console.log(e.target.className);
    document.getElementById('my-form').style.background = '#bbb';
    document.querySelector('body').classList.add('bg-light');
   
  });

function addItem(e)
{
    e.preventDefault();
    if(inputid.value ==='' || browseid.value ==='' || selectid.value ==='')
    {
        
        message.innerHTML='please enter details';
        setTimeout(()=>message.remove(),3000);
    }
    else
    {
       
        
   const obj={
          description:inputid.value,
          brow:browseid.value,
          sele:selectid.value
   }
   localStorage.setItem(obj.description,JSON.stringify(obj))
   showListofRegisteredUser(obj)


   //clear fields 
   inputid.value='';
     browseid.value='';
    selectid.value='';
}
}
function showListofRegisteredUser(user){
    const parentNode = document.getElementById('userlist');
    const createNewUserHtml = `<li id='${user.description}'>${user.description} - ${user.brow} - ${user.sele}
                                    <button onclick=deleteUser('${user.description}')>Delete</button>
                                    <button onclick=EditUser('${user.description}')>Edit</button>
                                </li>
                                `
    console.log(createNewUserHtml)
    parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
    console.log(parentNode.innerHTML)
}


window.addEventListener('load', (user) => {
    Object.keys(localStorage).forEach(key => {
        const user = JSON.parse(localStorage.getItem(key))
        showListofRegisteredUser(user)
    })
})


function deleteUser(user) {
    localStorage.removeItem(user)
    removeItemFromScreen(user)
}

function removeItemFromScreen(user){
    const parentNode = document.getElementById('userlist');
    const elem = document.getElementById(user)
    parentNode.removeChild(elem);
}
function EditUser(user) 
{
    var loc=localStorage.getItem(user);
    var yup=JSON.parse(loc);
    inputid.value=yup.description;
     browseid.value=yup.brow;
    selectid.value=yup.sele;
    deleteUser(user);
}



