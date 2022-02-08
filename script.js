const fetchData = () => {
  fetch("https://www.reddit.com/r/javascript.json")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.data.children);
      const html = data.data.children
        .map((user) => {
          return `
          <div class="data">
          <a href="${user.data.url}">Title: ${user.data.title}</a>
          <br>
          </div>
          `;
        })
        .join("");
      document.querySelector("#app").innerHTML = "";
      document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
    })
    .catch((error) => console.log(error));
};

const sortASC = () => {
  fetch("https://www.reddit.com/r/javascript.json")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      let arr = data.data.children;

      const compare = (a, b) => {
        if (a.data.title < b.data.title) {
          return -1;
        }
        if (a.data.title > b.data.title) {
          return 1;
        }
        return 0;
      };

      const sorted = arr
        .sort(compare)
        .map((user) => {
          console.log(user.data.title);
          return `
        <div class="data">
        <a href="${user.data.url}">Title: ${user.data.title}</a>
        <br>
        </div>
        `;
        })
        .join("");
      document.querySelector("#app").innerHTML = "";
      document.querySelector("#app").insertAdjacentHTML("afterbegin", sorted);
    });
};

const sortDESC = () => {
  fetch("https://www.reddit.com/r/javascript.json")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      let arr = data.data.children;

      const compare = (a, b) => {
        if (b.data.title < a.data.title) {
          return -1;
        }
        if (a.data.title > a.data.title) {
          return 1;
        }
        return 0;
      };

      const sorted = arr
        .sort(compare)
        .map((user) => {
          console.log(user.data.title);
          return `
        <div class="data">
        <a href="${user.data.url}">Title: ${user.data.title}</a>
        <br>
        </div>
        `;
        })
        .join("");
      document.querySelector("#app").innerHTML = "";
      document.querySelector("#app").insertAdjacentHTML("afterbegin", sorted);
    });
};

const search = () => {
  fetch("https://www.reddit.com/r/javascript.json")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      const input = document.getElementById("input_text").value;
      let arr = data.data.children;
      if (input != "") {
        let indexes = arr
          .map((elm, idx) =>
            elm.data.title.toLowerCase().includes(input.toLowerCase()) ||
            elm.data.selftext.toLowerCase().includes(input.toLowerCase())
              ? idx
              : ""
          )
          .filter(String);
        const mapIndexes = indexes
          .map((item) => {
            return `
      <div class="data">
      <a href="${arr[item].data.url}">Title: ${arr[item].data.title}</a>
      </div>
      `;
          })
          .join("");
        document.querySelector("#app").innerHTML = "";
        document
          .querySelector("#app")
          .insertAdjacentHTML("afterbegin", mapIndexes);
      } else alert("You must enter value!");
    });
};
