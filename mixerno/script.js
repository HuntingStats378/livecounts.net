function GetGoal(count2) {
  var count = parseFloat(count2);
  var t = parseFloat(count2);
  if (count == null) return 0;
  if (10 > t) return 10 - t;
  var e = "" + t;
  return Math.abs(
    t -
      (e.length > 6
        ? 1e6 * (Math.floor(t / 1e6) + 1)
        : (parseInt(e.charAt(0)) + 1) * Math.pow(10, e.length - 1))
  );
}

function GetGoal2(count2) {
  var count = parseFloat(count2);
  var t = parseFloat(count2);
  if (count == null) return 0;
  if (10 > t) return 10;
  var e = "" + t;
  return e.length > 6
    ? 1e6 * (Math.floor(t / 1e6) + 1)
    : (parseInt(e.charAt(0)) + 1) * Math.pow(10, e.length - 1);
}

function GetGoalText(t) {
  return ("" + t).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id") || "UCX6OQ3DkcsbYNE6H8uQQuVA";
const theme = params.get("theme") || "light";
document.getElementById("imageLink").href = `https://youtube.com/channel/${id}`;
document.getElementById(
  "subscribeBtn"
).href = `https://youtube.com/channel/${id}?sub_confirmation=1`;

setInterval(() => {
  fetch(`https://mixerno.space/api/youtube-channel-counter/user/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("name").textContent = data.user[0].count;
      document.querySelector(
        '[data-icon="zondicons:checkmark"]'
      ).style.display = data.isStudio ? "block" : "none";

      const image = document.getElementById("image");
      image.src =
        data.user[1].count;
      image.alt = data.snippet.title;
      document.getElementById("subscribers").innerHTML = data.counts[0].count;
      document.getElementById("goal").innerHTML = GetGoal(data.counts[0].count);
      document.getElementById(
        "goalText"
      ).textContent = `subscribers to ${GetGoalText(
        GetGoal2(data.counts[0].count)
      )}`;
    });
}, 2000);

function toggleLightMode() {
  document.body.classList.toggle("light");

  const localTheme = localStorage.getItem("theme");
  if (!localTheme || localTheme === "dark")
    localStorage.setItem("theme", "light");
  else localStorage.setItem("theme", "dark");
}

window.onload = () => {
  const localTheme = localStorage.getItem("theme");
  if (!localTheme) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("theme", "dark");
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.body.classList.toggle("light");
      localStorage.setItem("theme", "light");
    }
  }
  if (localTheme === "light") document.body.classList.toggle("light");
};

function search() {
  const prompt = window.prompt("Enter channel name, ID, or URL.");
  if (prompt)
    fetch(
      `https://mixerno.space/api/youtube-channel-counter/search/${prompt}`
    )
      .then((res) => res.json())
      .then((data) => {
        window.location.href = "?id=" + data.list[0][2];
      });
}
