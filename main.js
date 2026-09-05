const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-nav]");
function closeMenu(returnFocus = false) {
  const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
  if (returnFocus && wasOpen) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  navigation.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  document.body.classList.toggle("menu-open", open);
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu(true);
  if (
    event.key === "Tab" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    const lastLink = navigation.querySelector("a:last-child");
    if (event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault();
      lastLink.focus();
    } else if (!event.shiftKey && document.activeElement === lastLink) {
      event.preventDefault();
      menuButton.focus();
    }
  }
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    document.querySelectorAll("[data-project]").forEach((project) => {
      project.classList.toggle(
        "is-hidden",
        button.dataset.filter !== "all" &&
          project.dataset.project !== button.dataset.filter,
      );
    });
  });
});
// Reveal the featured game when navigating from a filtered view.
document.querySelectorAll('a[href="#blood-saga"]').forEach((link) =>
  link.addEventListener("click", () => {
    document.querySelector('[data-filter="all"]').click();
  }),
);
document.querySelectorAll("[data-image]").forEach((button) => {
  button.addEventListener("click", () => {
    const source = `assets/blood-saga/${button.dataset.image}`;
    const image = document.querySelector("#gallery-image");
    image.src = source;
    image.alt = button.dataset.alt;
    document.querySelector("#full-image").href = source;
    document.querySelector("#gallery-caption").textContent =
      button.dataset.caption;
    document.querySelectorAll("[data-image]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
  });
});
document.querySelector("#year").textContent = new Date().getFullYear();
