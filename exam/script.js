function addItem() {
    let textField = document.querySelector("#title");
    let room = document.querySelector("#room");
    let material = document.querySelector("#material");
    let width = document.querySelector("#width");
    let height = document.querySelector("#height");
    let thickness = document.querySelector("#thickness");

    let item = {
        title: textField.value,
        room: room.value,
        material: material.value,
        width: width.value,
        height: height.value,
        thickness: thickness.value
    }

    fetch(`http://127.0.0.1:8000/add-item`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    }) 
    .then(response => response.json())
    .then(data => console.log(data));
}


function updLabelW() {
    let labelW = document.querySelector("#width-slider");
    labelW.textContent = document.querySelector("#width").value;
}

function updLabelH() {
    let labelH = document.querySelector("#height-slider");
    labelH.textContent = document.querySelector("#height").value;
}

function updLabelT() {
    let labelT = document.querySelector("#thickness-slider");
    labelT.textContent = document.querySelector("#thickness").value;

}

function allitems() {
    let container = document.querySelector("#items");
    let selectVal = document.querySelector("#material2").value;

    fetch(`http://127.0.0.1:8000/show-items/${selectVal}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        for (let item of data) {
            let itemItem = document.createElement("div");
            itemItem.setAttribute("class", "item-item")
            itemItem.textContent = `${item.id}. ${item.title} ${item.material} ${item.width}x${item.height}x${item.thickness} mm ${item.room}`;
            container.appendChild(itemItem);
            //let br = document.createElement("br/");
            //container.appendChild(br);
        }
    })
}

function delitem() {
    fetch(`http://127.0.0.1:8000/delete-item/1`)
    .then(response => response.json())
    .then(data => console.log(data))
}