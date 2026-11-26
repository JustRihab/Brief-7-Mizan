import { request } from "./api2.js";
import { articlesCards } from "./render2.js";

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
let articles = [];
const erreurArticles = document.getElementById("erreur-articles");
const messageVide = document.getElementById("message-vide");
const actualiserBtn = document.getElementById("actualiser-articles");
const rechercheArticle = document.getElementById("recherche-article");
const filtreStatut = document.getElementById("filtre-statut");
const triArticles = document.getElementById("tri-articles");
const modalDetails = document.getElementById("modal-details");
const modalTitre = document.getElementById("modal-titre");
const modalPrix = document.getElementById("modal-prix");
const modalStatut = document.getElementById("modal-statut");
const modalDate = document.getElementById("modal-date");
const modalDescription = document.getElementById("modal-description");
const fermerModal = document.getElementById("fermer-modal");

function appliquerFiltres() {
    const recherche = rechercheArticle.value.toLowerCase();
    const selectfiltre = filtreStatut.value;
    const selectTri = triArticles.value;
    const articleRechercheAndSelect = articles.filter(article => {
        return article.titre.toLowerCase().includes(recherche) && (selectfiltre === "" || article.statut === selectfiltre);   
    });
    if (articles.length === 0) {
        messageVide.classList.remove("hidden");
        messageVide.textContent = "Aucun article disponible pour le moment.";
    }
    else if (articleRechercheAndSelect.length === 0) {
        messageVide.classList.remove("hidden");
        messageVide.textContent = "Aucun article trouvé.";
    }
    else {
        messageVide.classList.add("hidden");
    }
    if (selectTri === "prix") {
        articleRechercheAndSelect.sort((a, b) => a.prix - b.prix);
    }
    else if (selectTri === "titre") {
        articleRechercheAndSelect.sort((a, b) => a.titre.localeCompare(b.titre));
    }
    else if (selectTri === "date") {
        articleRechercheAndSelect.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }
    articlesCards(articleRechercheAndSelect, chargerArticle);
}

async function chargerArticles() {
    try {
        articles = await request("/articles");
        appliquerFiltres();
        erreurArticles.classList.add("hidden");
    }
    catch (error) {
        erreurArticles.textContent = error.message;
        erreurArticles.classList.remove("hidden");
        messageVide.classList.add("hidden");
    }
}
chargerArticles();

async function chargerArticle(id) {
    try {
        const article = await request(`/articles/${id}`);
        modalTitre.textContent = article.titre;
        modalPrix.textContent = `Prix : ${article.prix} MAD`;
        modalStatut.textContent = `Statut : ${article.statut}`;
        modalDate.textContent = `Date : ${article.date}`;
        modalDescription.textContent = `Description : ${article.description}`;
        modalDetails.classList.remove("hidden");
    }
    catch (error) {
        console.log(error.message);
    }
}

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
    if (sidebar.classList.contains("-translate-x-full")) {
      menuBtn.textContent = "Menu ☰";
    } else {
      menuBtn.textContent = "✕";
    }
});
    
overlay.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    menuBtn.textContent = "Menu ☰";
});

actualiserBtn.addEventListener("click", () => {
    rechercheArticle.value = "";
    filtreStatut.value = "";
    triArticles.value = "";
    chargerArticles();
});

rechercheArticle.addEventListener("input", () => {
    appliquerFiltres();
});

filtreStatut.addEventListener("change", () => {
    appliquerFiltres();
});

triArticles.addEventListener("change", () => {
    appliquerFiltres();
});

fermerModal.addEventListener("click", () => {
    modalDetails.classList.add("hidden");
});