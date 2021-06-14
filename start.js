document.addEventListener("DOMContentLoaded", function() {

    /* ============== GLOBAL VARIBLES ============== */
    const form = document.getElementById("form");
    const formTitle = document.getElementById("form-title");
    const formDescribe = document.getElementById("form-describe");
    const divRequired = document.getElementById("required")
    const tableBody = document.getElementById("table-body");

    let i = 1;
    /* ============== FORM SUBMIT ============== */
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validateTask()
        i++;
    });
    /* ============== VALIDATE TASK CONTENT ============== */
    function validateTask() {
        if (formTitle.value == "" || formDescribe.value == "") {
            divRequired.classList.remove("d-none");
            setTimeout(() => {
                divRequired.classList.add("d-none")
            }, 1200);
        } else {
            createTask(i, formTitle.value, formDescribe.value);
            form.reset();
        }
    };
    /* ============== CREATE TASK ============== */
    function createTask(id, title, description) {
        const tr = document.createElement("tr");
        tr.setAttribute("id", id);
        tr.classList.add("text-break");
        tr.innerHTML = `
                <th scope="row" class="align-middle text-nobreak">${id}</th>
                <td>${title}</td>
                <td>${description}</td>
                <td class="align-middle"></td>
                <td class="align-middle"></td>`
        tableBody.appendChild(tr);

        /* ============== CALL FUNCTIONS CREATE ============== */
        const column = document.getElementById(id);
        let columnId = column.getAttribute("id");

        createInputCompleted(column.children[3], columnId);
        createBtnEdit(column.children[4], columnId);
        createBtnDelete(column.children[4], columnId);
    };
    /* ============== CREATE BTN DELETE ============== */
    function createBtnDelete(column, ident) {
        const btnRemove = document.createElement("button");
        btnRemove.classList.add("btn", "btn-danger");
        btnRemove.innerHTML = '<i class="far fa-trash-alt fs-5">';
        column.appendChild(btnRemove);
        btnRemove.addEventListener("click", () => {
            const rowDelete = document.getElementById(ident);
            rowDelete.remove();
        })
    };

    /* ============== CREATE INPUT COMPLETED ============== */
    function createInputCompleted(column, ident) {
        const inputCompleted = document.createElement("input");
        inputCompleted.setAttribute("type", "checkbox");
        column.appendChild(inputCompleted);
        inputCompleted.addEventListener("change", () => {
            const rowDelete = document.getElementById(ident);
            setTimeout(() => {
                rowDelete.remove();
            }, 200);
            const contChange = document.getElementById("cont-change");
            contChange.classList.add("d-none");
        })
    };

    /* ============== CREATE BUTTON EDIT ============== */
    function createBtnEdit(column, ident) {
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-warning");
        btnEdit.innerHTML = '<i class="fas fa-pen fs-6 "></i>';
        column.appendChild(btnEdit);

        /* ============== CALL FUNCTION: CHANGE CONTAINER POSITION ============== */
        btnEdit.addEventListener("click", (e) => {
            changeContainerPosition(ident);
        })
    };

    /* ============== CHANGE CONTAINER POSITION CHANGE ============== */
    function changeContainerPosition(identify) {
        let rowChange = document.getElementById(identify);
        const containerChange = document.getElementById("cont-change");
        let top = (rowChange.offsetTop + containerChange.clientHeight);
        const btnConfirmChange = document.getElementById('confirm-change');

        containerChange.style.top = top + "px";
        containerChange.classList.toggle("d-none");
        containerChange.children[0].children[0].textContent = `Change content of task ${identify}`
        displayChangeContainer(containerChange);
        /* ============== CALL FUNCTION VALIDATE CONTENT OF CAHNGE CONTAINER ============== */
        btnConfirmChange.onclick = (e) => {
            e.preventDefault();

            const changeTitleValue = document.getElementById("change-title").value;
            const changeDescriptionValue = document.getElementById("change-description").value;
            let titleRow = rowChange.children[1];
            let descriptionRow = rowChange.children[2];

            if (changeTitleValue == "" || changeDescriptionValue == "") {
                divRequired.classList.remove("d-none");
                setTimeout(() => {
                    divRequired.classList.add("d-none")
                }, 1200);
            } else {
                let message = confirm(`Are you shure you want to change the content of your task number: ${identify}?`);
                if (message === true) {
                    titleRow.innerText = changeTitleValue;
                    descriptionRow.innerText = changeDescriptionValue;
                    containerChange.classList.add("d-none");
                };
            };
        };
    };
    /* ============== DISPLAY OF CHANGE CONTAINER ============== */
    function displayChangeContainer(container) {
        const btnCancelContainer = document.getElementById("cancel-change");
        btnCancelContainer.onclick = () => { container.classList.add("d-none") }
    };
});