import { request } from "./api2.js";

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");

  if (sidebar.classList.contains("-translate-x-full")) {
    menuBtn.textContent = "☰";
  } else {
    menuBtn.textContent = "✕";
  }
});

overlay.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
  menuBtn.textContent = "Menu ☰";
}); 
