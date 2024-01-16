let lastId = null;

async function init() {
  const response = await fetch("https://dummyjson.com/products?limit=10");
  const result = await response.json();
  render(result.products);
}

function render(items) {
  const itemsContainer = document.querySelector(".items-container");
  items.forEach((item) => {
    const title = document.createElement("h4");
    const titleContent = document.createTextNode(item.title);
    title.appendChild(titleContent);
    const itemCard = document.createElement("li");
    itemCard.appendChild(title);

    const description = document.createElement("span");
    const descriptionContent = document.createTextNode(item.description);
    description.appendChild(descriptionContent);
    itemCard.appendChild(description);
    const btnX = document.createElement("button");
    const btnContent = document.createTextNode("X");
    btnX.appendChild(btnContent);
    btnX.addEventListener("click", () => deleteItem(item.id));
    itemCard.setAttribute("id", `product-${item.id}`);
    itemCard.appendChild(btnX);
    itemsContainer.appendChild(itemCard);

    lastId = item.id;
  });
}

async function deleteItem(id) {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    const item = document.querySelector(`#product-${id}`);
    item.remove();
  }
}

async function loadMore() {
  const response = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${lastId}`
  );
  const result = await response.json();
  render(result.products);
  console.log(lastId);
}
