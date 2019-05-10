import * as signalR from "@aspnet/signalr";

const divMessage: HTMLDivElement = document.querySelector("#divMessage");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.start().catch(err => document.write(err));

connection.on("messageReceived", (username: string, message: string) => {
    let m = document.createElement("div");

    m.innerHTML =
        `<div class="message-author">${username}</div><div>${message}</div>`;
    divMessage.appendChild(m);
    divMessage.scrollTop = divMessage.scrollHeight;
});

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
    if(e.keyCode === 13) {
        send();
    }
});

btnSend.addEventListener("click", send);

function send() {
    connection.send("newMessage", username, tbMessage.value)
        .then(() => tbMessage.value = "");
}