const oldName = document.getElementById("replaceThis");
const newName = document.getElementById("replacedName");

const submit = document.getElementById("old");
const replace = document.getElementById("new");

let replaceThis = "";
let replaceWith = "";

submit.addEventListener("click", () => {
  replaceThis = oldName.value;
  console.log("Old Name: ", replaceThis);
  submit.classList.add('green')
});

let c = ["public","node_modules",".package-lock","package","server"]

replace.addEventListener("click", () => {
  if (replaceThis === "" ||replaceWith === "" ||c.includes(replaceThis)) {
    alert('Please add a valid class name')
    submit.classList.remove('green')
    replaceThis = ""
    replaceWith = ""
    return;
  }
  submit.classList.remove('green')
  replaceWith = newName.value;
  console.log("New Name: ", replaceWith);
  fetch("/rename", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replaceThis,
      replaceWith,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
