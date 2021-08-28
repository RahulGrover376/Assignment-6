let todo_text=document.getElementById("todo_text");
let btn=document.getElementById("btn");
let list=document.querySelector("table");

var cached_data=[];

init_todo();

btn.addEventListener("click",add_ToDo);

todo_text.addEventListener("keyup",function(event)
{
    if(event.keyCode===13)
    add_ToDo();
})

function add_ToDo()
{
    let task=todo_text.value;

    if(!task)
    return;

    let tr=document.createElement('tr');
    let inp=document.createElement('input');
    let td1=document.createElement('td');
    let td2=document.createElement('td');
    let td3=document.createElement('td');
    let td4=document.createElement('td');
    let td5=document.createElement('td');
    inp.value=task;
    td1.append(inp);
    inp.disabled=true;
    let upicon=document.createElement('i');
    upicon.classList.add("fa","fa-solid","fa-arrow-up");
    td2.append(upicon);
    let trashicon=document.createElement('i');
    trashicon.classList.add("fa","fa-solid","fa-trash");
    td3.append(trashicon);
    let updateicon=document.createElement('i');
    updateicon.classList.add("fa","fa-solid","fa-edit");
    td4.append(updateicon);
    let downicon=document.createElement('i');
    downicon.classList.add("fa","fa-solid","fa-arrow-down");
    td5.append(downicon);

    // now implementing button functionalities

    trashicon.addEventListener("click",()=>
    {
        tr.remove();
    })

    updateicon.addEventListener("click",()=>
    {
            inp.disabled=!inp.disabled;
    })

    downicon.addEventListener("click",()=>
    {
        let x=tr.nextSibling;
        let y=tr;
        if(x!=null)
        {
            tr.remove();
            x.after(y);
        }
    })

    upicon.addEventListener("click",()=>
    {

        let x=tr.previousSibling;
        let y=tr;
        if(x!=null)
        {
            tr.remove();
            x.before(y);
        }

    })

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    list.append(tr);
    
    todo_text.value="";



    cached_data.push(task);

    var string_data=JSON.stringify(cached_data);
    localStorage.setItem('todo_data',string_data);

    
}

function init_todo()
{

    var data=localStorage.getItem('todo_data');

    if(data)
    {
        data=JSON.parse(data);

    }
    else{
        data=[];
    }

    cached_data=data;

    data.forEach(function(value)
  {
    var element = document.createElement("p");
    element.innerText = value;
    element.style.display='none';
    list.appendChild(element)

    element.addEventListener("click", function()
    {
        list.removeChild(element);
    });


  })
}

