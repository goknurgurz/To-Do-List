const storeData = data => window.localStorage.setItem("data", JSON.stringify(data))
const getData = key => window.localStorage.getItem(key)
const addBtn = document.getElementById("add-btn");
const input = document.getElementById("text-input");
const list = document.querySelector("ul");
const data = JSON.parse(getData("data") || "[]");



// Click Listener for button 
addBtn.addEventListener("click", () => {
    if(input.value) { // TO make sure the text is not empty
        data.push({
            id: Math.floor(Math.random() * 10000),  // Random Id
            text: input.value,
            isFinished: false,
            color: getColor(),
        });
        storeData(data); // to store the new data
        showData(data);
    }
    input.value = "";
});

const getColor = () => {  // Random color
    return {
        red: Math.random() * 256,
        green: Math.random() * 256,
        blue: Math.random() * 256,
    }
}

const showData = (data) => {
    list.innerHTML = "";  // To make sure the list is empty
    data.map((item) => { // Loop
        list.innerHTML += `
    <li style="background-color: rgb(${item.color.red}, ${item.color.green}, ${item.color.blue})">
        <p style="text-decoration: ${item.isFinished ? "line-through": "none"};
         color:${isLight(item.color.red, item.color.green, item.color.blue) ? "white": "black"}">
        ${item.text}
        </p>
        <div class="delete-edit">
            <button class="delete" onClick="remove(${item.id})">
                <img src="${isLight(item.color.red, item.color.green, item.color.blue) ?
                     "./assets/icons/delete-white.png": "./assets/icons/delete.png"}" alt="delete"/>
            </button>
            <button id="check-btn" class="edit" onClick="check(${item.id})">
                <img src="${isLight(item.color.red, item.color.green, item.color.blue) ? 
                    "./assets/icons/check-white.png": "./assets/icons/check.png"}" alt="edit"/>
            </button>
        </div>
    </li>  
`
    });
}

const check = (id) => {
    const index = data.findIndex((item) => item.id === id); 
    data[index].isFinished = !data[index].isFinished;
    storeData(data); // to store the new data 
    showData(data);
}

const remove = (id) => {
    const index = data.findIndex((item) => item.id === id); 
    if(index != -1) {
        data.splice(index, 1);
        storeData(data); // to store the new data
        showData(data);
    }
} 

const isLight = (r, g, b) => {
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq < 128;
}

showData(data); 
