const token = sessionStorage.getItem("jwt");
if (!token) {
  window.location.replace("./login.html");
} else {
  const logout = document.getElementById("logout");
  const upload = document.getElementById("upload");
  async function newposts(){
    const res = await fetch(
    "/api/posts/",
    {
      method: "GET",
      headers: {
        "authentication": token,
        "Content-Type": "application/json",
      },
    }
  );
  const posts = await res.json();
  const htmlArray = posts.content.map(e=>`<p>${e.message}</p>`);
  document.getElementById("content-area").innerHTML = htmlArray.join('\n');
}
newposts()
  upload.addEventListener("click", async () => {
    const data = {
      posts: document.getElementById("posts").value,
    };
    await fetch(
      "/api/posts/new",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "authentication": token,
          "Content-Type": "application/json",
        },
      }
    );
    document.getElementById("posts").value = "";
  });
  logout.addEventListener("click", async () => {
    // const res = await fetch(
    //   "/api/user/logout",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const tok = await res.json()
    // sessionStorage.setItem("jwt",tok.token)
    sessionStorage.removeItem("jwt")
    window.location.assign("./login.html");
    return false;
  });
}
