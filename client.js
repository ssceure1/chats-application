console.log("This is client.js")

const socket = io();


let names;

let textarea = document.getElementById("textarea");
let messagearea = document.querySelector('.message_area')

do {
    names = prompt("Please Enter Your Name");
}while(!names)

document.addEventListener('click', () => {
    var user_arrays = [];
    user_arrays.push(names);
    console.log(user_arrays);
});
textarea.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);  
    }
});


// append name by me
let contact = document.querySelector('.contact');
let newusername = document.createElement('h2');
newusername.className = 'contact_name';
newusername.innerText = names;
contact.appendChild(newusername);

// let newusername;
// newusername.innerHTML = addname;


function sendMessage(messages) {
    // console.log("true")
    let msg = {
        user: names,
        message: messages.trim()
    }
    //  Append
    appendMessage(msg, 'outcoming');
    textarea.value = "";
    scrollToBottom();
        socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p1>${msg.message}</p>
    `

    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);
}


// Receive message


socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
})


function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight;
};
