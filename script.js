let form = document.getElementById("submitForm");

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").value;

    const formData = {
        amount: amount,
        description: description,
        category:category
    }

    saveData(formData);
    location.reload();
});

const storedData = JSON.parse(localStorage.getItem('formData')) || [];
function saveData(formData){
    storedData.push(formData);

    localStorage.setItem('formData', JSON.stringify(storedData));
}

let body = document.getElementsByTagName('body');
let list = document.createElement('ul');
list.className = 'list-group d-flex align-items-center justify-content-center';

function displayData(){
    list.innerHTML = '';

    storedData.forEach((element, index) => {
        let listitem = document.createElement('li');
        list.className = 'list-group-item w-50 '
        listitem.textContent = element.amount + ' - ' + element.description + ' - ' + element.category+ " ";

        //Delete
        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete Expenses';
        delBtn.className = 'btn btn-danger'
        delBtn.addEventListener('click', function(){
            storedData.splice(index,1);
            localStorage.setItem('formData', JSON.stringify(storedData));

            displayData();
        });

        //Edit
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit Expenses';
        editBtn.className = 'btn btn-warning'
        editBtn.addEventListener('click', function() {
            let amount = element.amount;
            document.getElementById('amount').value = amount;
            let description = element.description;
            document.getElementById('description').value = description;
            let category = element.category;
            document.getElementById('category').value = category;

            storedData.splice(index,1);
            displayData();
        })

        listitem.appendChild(delBtn);
        listitem.appendChild(editBtn);
        list.appendChild(listitem);
        // form.appendChild(list);
        document.body.appendChild(list);
    });
}
form.reset();
displayData();
