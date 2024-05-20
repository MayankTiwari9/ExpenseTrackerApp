let form = document.getElementById("submitForm");
        let storedData = [];
        let editingExpenseId = null;

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let amount = document.getElementById("amount").value;
            let description = document.getElementById("description").value;
            let category = document.getElementById("category").value;

            const formData = {
                amount: amount,
                description: description,
                category: category,
            };

            if (editingExpenseId) {
                // Editing an existing expense
                formData.id = editingExpenseId;
                axios.put('http://localhost:4000/edit-expense', formData)
                    .then((res) => {
                        form.reset();
                        editingExpenseId = null;
                        displayData();
                    })
                    .catch((err) => console.log(err));
            } else {
                // Adding a new expense
                axios.post('http://localhost:4000/add-expense', formData)
                    .then((res) => {
                        saveData(formData);
                        form.reset();
                        displayData();
                    })
                    .catch((err) => console.log(err));
            }
        });

        function saveData(formData) {
            storedData.push(formData);
            localStorage.setItem("formData", JSON.stringify(storedData));
        }

        function displayData() {
            axios.get('http://localhost:4000')
                .then((res) => {
                    storedData = res.data;
                    updateExpenseList();
                })
                .catch((err) => console.log(err));
        }

        function updateExpenseList() {
            let list = document.getElementById("expenseList");
            list.innerHTML = "";

            storedData.forEach((element, index) => {
                let listItem = document.createElement("li");
                listItem.className = "list-group-item w-50";
                listItem.textContent = `${element.amount} - ${element.description} - ${element.category}`;

                let delBtn = document.createElement("button");
                delBtn.textContent = "Delete";
                delBtn.className = "btn btn-danger ml-2";
                delBtn.addEventListener("click", function () {
                    axios.delete(`http://localhost:4000/delete-expense/${index}`)
                        .then(() => {
                            storedData.splice(index, 1);
                            localStorage.setItem("formData", JSON.stringify(storedData));
                            displayData();
                        })
                        .catch((err) => console.log(err));
                });

                let editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.className = "btn btn-warning ml-2";
                editBtn.addEventListener("click", function () {
                    document.getElementById("amount").value = element.amount;
                    document.getElementById("description").value = element.description;
                    document.getElementById("category").value = element.category;
                    editingExpenseId = element.id;

                    storedData.splice(index, 1);
                    localStorage.setItem("formData", JSON.stringify(storedData));
                    updateExpenseList();
                });

                listItem.appendChild(delBtn);
                listItem.appendChild(editBtn);
                list.appendChild(listItem);
            });
        }

        displayData();