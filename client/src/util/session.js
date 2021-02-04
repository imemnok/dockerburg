const baseUri = ""

export const login = user => (
    fetch(`${baseUri}/session`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
  );
  
  export const signup = user => (
    fetch(`${baseUri}/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
  );
  
  export const logout = () => (
    fetch(`${baseUri}/session`, { method: "DELETE" })
  );
  
  export const checkLoggedIn = async () => {
    const response = await fetch(`${baseUri}/session`);
    const { user } = await response.json();
    const menu = await fetch(`${baseUri}/menu/menuItems`);
    const  menuItems  = await menu.json()
    let preloadedState = {};
    // if (user) {
      preloadedState = {
        session: user ? user : "",
        menuItems: menuItems ? menuItems : ""
      // };
    }
    return preloadedState;
  };