const baseUri = ""

export const getMenuItems = () =>
  fetch(`${baseUri}/menu/menuItems`, {
    method: "GET",
  });

export const getMenuItem = (menuItem) =>
  fetch(`${baseUri}/menu/menuItems/${menuItem}`, {
    method: "GET",
  });

export const addMenuItem = (menuItem) =>
  fetch(`${baseUri}/menu/add`, {
    method: "POST",
    body: JSON.stringify(menuItem),
    headers: {
      "Content-Type": "application/json",
    },
  });
