const listeArticles = document.getElementById("liste-articles");

export function articlesCards(articles, chargerArticle) {
    listeArticles.textContent = "";
    articles.forEach(article => {
        const card = document.createElement("div");
        const nom = document.createElement("h2");
        const pPrix = document.createElement("p");
        const pStatut = document.createElement("p");
        const pDate = document.createElement("p");
        const btnDetails = document.createElement("button");
        card.className = "bg-[#F5F2EC] p-5 border border-[#E8DFD0] rounded-2xl shadow-sm hover:shadow-md transition";
        nom.textContent = article.titre;
        nom.className = "font-bold text-2xl text-[#172A46] font-serif";
        pPrix.textContent =article.prix;
        pPrix.className = "font-bold text-[#B8860B]";
        pStatut.textContent = article.statut;
        if (article.statut === "disponible") {
            pStatut.className = "font-serif text-green-700";
        }
        else {
            pStatut.className = "font-serif text-red-700";
        }
        pDate.textContent =article.date;
        pDate.className = "font-mono font-semibold";
        btnDetails.textContent = "Voir détails";
        btnDetails.addEventListener("click", () => {
            chargerArticle(article.id);
        });
        card.append(nom, pPrix, pStatut, pDate, btnDetails);
        listeArticles.append(card);
    });
}
 