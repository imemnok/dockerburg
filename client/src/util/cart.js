const baseUri = ""
export const getCarts = () =>
  fetch(`${baseUri}/cart/`, {
    method: "GET",
  });

export const getCart = (cart) =>
  fetch(`${baseUri}/cart/${cart}`, {
    method: "GET",
  });

export const createCart = (cart) =>
  fetch(`${baseUri}/cart/add`, {
    method: "POST",
    body: JSON.stringify(cart),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateCart = (cart) =>
  fetch(`${baseUri}/cart/update`, {
    method: "POST",
    body: JSON.stringify(cart),
    headers: {
      "Content-Type": "application/json",
    },
  });
