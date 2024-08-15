(async function () {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    let employees = data;

    // To display employees list in this container
    const employees_list = document.querySelector(".employee__list--employees");

    // To display employee details in the information section
    const employee_information = document.querySelector(
      ".employee__info--container"
    );

    // selected employee id
    let selectedEmployeeId = employees[0]?.id;

    let selectedEmployee = employees[0];

    // To select employee
    employees_list.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN" && e.target.id !== selectedEmployeeId) {
        selectedEmployeeId = e.target.id;

        const emp = employees?.find(
          (emp) => Number(emp?.id) === Number(selectedEmployeeId)
        );

        selectedEmployee = emp;

        renderSingleEmployee();
        renderEmployees();
      }

      // If click on delete button
      if (e.target.tagName === "BUTTON") {
        // It gives the id of parent element which we've give to each item
        const clickedId = e.target.parentElement.id;

        const filteredEmployees = employees?.filter(
          (item) => Number(item?.id) !== Number(clickedId)
        );

        employees = filteredEmployees;

        selectedEmployeeId = employees[0]?.id ?? -1;
        selectedEmployee = employees[0] ?? {};
        renderEmployees();
        renderSingleEmployee();
      }
    });

    // To render all employees
    const renderEmployees = () => {
      employees_list.innerHTML = "";

      employees.forEach((element) => {
        let employee = document.createElement("span");
        employee.innerHTML = `${element?.firstName} ${element?.lastName} <button>X</button>`;

        employee.classList.add("employee__list--item");
        if (Number(element.id) === Number(selectedEmployeeId))
          [employee.classList.add("employee__item--selected")];

        employee.setAttribute("id", element?.id);

        employees_list.appendChild(employee);
      });
    };

    const renderSingleEmployee = () => {
      employee_information.innerHTML = "";
      if (selectedEmployeeId === -1) return "";
      employee_information.innerHTML = `<img
              class="employee__profile"
              src=${
                selectedEmployee?.imageUrl ??
                "https://media.discordapp.net/attachments/1053315364529897542/1273470803702317127/image.png?ex=66bebb9b&is=66bd6a1b&hm=816d051447cded86df8a1de30ed0132865cf8a214b50d1ece3ceebb6a3ae679a&=&format=webp&quality=lossless&width=1135&height=660"
              }
              alt=${selectedEmployee?.firstName}
              width="200"
              height="200"
            />
            <h3>${selectedEmployee?.firstName} ${
        selectedEmployee?.lastName
      }</h3>
            <p>${selectedEmployee?.address}</p>
            <p>${selectedEmployee?.email}</p>
            <p>${selectedEmployee?.contactNumber}</p>
            <p>${selectedEmployee?.dob}</p>`;
    };

    renderEmployees();
    renderSingleEmployee();
  } catch (error) {}
})();
