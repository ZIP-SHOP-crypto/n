/* =========================================================== */
/* ZIP SHOP - SCRIPT PRINCIPAL                                 */
/* =========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================================= */
    /* LOADER                                                   */
    /* ======================================================= */

    const loader = document.querySelector(".loader");

    if (loader) {

        window.addEventListener("load", function () {
            loader.style.opacity = "0";
            setTimeout(function () {
                loader.style.display = "none";
            }, 300);
        });

    }

    /* ======================================================= */
    /* MENU MOBILE (HAMBURGER)                                  */
    /* Corrige le bug mobile : le menu ne prenait plus toute    */
    /* la hauteur de l'ecran et on peut de nouveau interagir    */
    /* avec le reste de la page.                                */
    /* ======================================================= */

    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navCollapse = document.getElementById("navCollapse");

    if (hamburgerBtn && navCollapse) {

        hamburgerBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            navCollapse.classList.toggle("active");
        });

        // Ferme le menu quand on clique sur un lien du menu
        navCollapse.querySelectorAll(".menu a").forEach(function (link) {
            link.addEventListener("click", function () {
                navCollapse.classList.remove("active");
            });
        });

        // Ferme le menu si on clique en dehors
        document.addEventListener("click", function (e) {
            if (
                navCollapse.classList.contains("active") &&
                !navCollapse.contains(e.target) &&
                e.target !== hamburgerBtn
            ) {
                navCollapse.classList.remove("active");
            }
        });

    }

    /* ======================================================= */
    /* MENU TROIS POINTS : lien / telechargement / traduction   */
    /* ======================================================= */

    const moreBtn = document.getElementById("moreBtn");
    const moreDropdown = document.getElementById("moreDropdown");

    if (moreBtn && moreDropdown) {

        moreBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            moreDropdown.classList.toggle("active");
        });

        document.addEventListener("click", function (e) {
            if (
                moreDropdown.classList.contains("active") &&
                !moreDropdown.contains(e.target) &&
                e.target !== moreBtn
            ) {
                moreDropdown.classList.remove("active");
            }
        });

    }

    // Enregistrer / copier le lien de la page

    const copyLinkBtn = document.getElementById("copyLinkBtn");

    if (copyLinkBtn) {

        copyLinkBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const url = window.location.href;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function () {
                    alert("Lien copié : " + url);
                }).catch(function () {
                    prompt("Copiez ce lien :", url);
                });
            } else {
                prompt("Copiez ce lien :", url);
            }

            moreDropdown.classList.remove("active");
        });

    }

    // Telecharger la page actuelle (fichier HTML)

    const downloadBtn = document.getElementById("downloadBtn");

    if (downloadBtn) {

        downloadBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const pageHtml = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
            const blob = new Blob([pageHtml], { type: "text/html" });
            const blobUrl = URL.createObjectURL(blob);

            let fileName = window.location.pathname.split("/").pop();
            if (!fileName) {
                fileName = "page.html";
            }

            const tempLink = document.createElement("a");
            tempLink.href = blobUrl;
            tempLink.download = fileName;
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(blobUrl);

            moreDropdown.classList.remove("active");
        });

    }

    // Traduire la page dans la langue choisie (Google Traduction)

    const translateSelect = document.getElementById("translateSelect");

    if (translateSelect) {

        translateSelect.addEventListener("change", function () {

            const lang = translateSelect.value;

            if (!lang) {
                return;
            }

            const currentUrl = window.location.href;

            const translateUrl =
                "https://translate.google.com/translate?sl=auto&tl=" +
                lang +
                "&u=" +
                encodeURIComponent(currentUrl);

            window.open(translateUrl, "_blank");

            translateSelect.value = "";
            moreDropdown.classList.remove("active");

        });

    }

    /* ======================================================= */
    /* RECHERCHE DE PRODUITS                                    */
    /* Filtre en direct les cartes produits de la page selon    */
    /* le texte tape (nom du produit ou de la categorie).       */
    /* ======================================================= */

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function runSearch() {

        if (!searchInput) {
            return;
        }

        const query = searchInput.value.trim().toLowerCase();

        // Toutes les cartes "produit" presentes sur les differentes pages
        const cardSelectors = ".product-card, .shop-card, .gallery-item, .category-card";
        const cards = document.querySelectorAll(cardSelectors);

        if (cards.length === 0) {
            return;
        }

        let visibleCount = 0;

        cards.forEach(function (card) {

            const text = card.textContent.toLowerCase();
            const matches = query === "" || text.includes(query);

            card.style.display = matches ? "" : "none";

            if (matches) {
                visibleCount++;
            }

        });

        // Affiche un message si aucun resultat n'est trouve
        cards.forEach(function (card) {

            const grid = card.parentElement;

            if (!grid) {
                return;
            }

            let noResultMsg = grid.querySelector(".no-results");

            if (visibleCount === 0) {

                if (!noResultMsg) {
                    noResultMsg = document.createElement("p");
                    noResultMsg.className = "no-results";
                    noResultMsg.textContent = "Aucun produit ne correspond à votre recherche.";
                    grid.appendChild(noResultMsg);
                }

            } else if (noResultMsg) {
                noResultMsg.remove();
            }

        });

    }

    if (searchInput) {

        searchInput.addEventListener("input", runSearch);

        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                runSearch();
            }
        });

    }

    if (searchBtn) {
        searchBtn.addEventListener("click", function (e) {
            e.preventDefault();
            runSearch();
        });
    }

    /* ======================================================= */
    /* PANIER / FAVORIS - retour visuel simple                  */
    /* ======================================================= */

    let cartCount = 0;
    let favCount = 0;

    const cartCountEl = document.getElementById("cartCount");
    const favCountEl = document.getElementById("favCount");

    document.querySelectorAll(".btn-cart, .cart-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            cartCount++;
            if (cartCountEl) {
                cartCountEl.textContent = cartCount;
            }
        });
    });

    document.querySelectorAll(".btn-favorite").forEach(function (btn) {
        btn.addEventListener("click", function () {
            btn.classList.toggle("active");
            favCount = document.querySelectorAll(".btn-favorite.active").length;
            if (favCountEl) {
                favCountEl.textContent = favCount;
            }
        });
    });

    /* ======================================================= */
    /* ZOOM SUR LES IMAGES PRODUITS                              */
    /* ======================================================= */

    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".close-modal");

    if (imageModal && modalImage) {

        document.querySelectorAll(".zoom-image").forEach(function (img) {
            img.addEventListener("click", function () {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                imageModal.classList.add("active");
                imageModal.style.display = "flex";
            });
        });

        function hideModal() {
            imageModal.style.display = "none";
            imageModal.classList.remove("active");
        }

        if (closeModal) {
            closeModal.addEventListener("click", hideModal);
        }

        imageModal.addEventListener("click", function (e) {
            if (e.target === imageModal) {
                hideModal();
            }
        });

    }

    /* ======================================================= */
    /* COMPTE A REBOURS DE LA PROMOTION                          */
    /* ======================================================= */

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {

        // La promotion se termine 5 jours apres l'ouverture de la page
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 5);

        function updateCountdown() {

            const now = new Date();
            let diff = endDate - now;

            if (diff < 0) {
                diff = 0;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            daysEl.textContent = String(d).padStart(2, "0");
            hoursEl.textContent = String(h).padStart(2, "0");
            minutesEl.textContent = String(m).padStart(2, "0");
            secondsEl.textContent = String(s).padStart(2, "0");

        }

        updateCountdown();
        setInterval(updateCountdown, 1000);

    }

    /* ======================================================= */
    /* FILTRES DE LA BOUTIQUE (shop.html)                        */
    /* ======================================================= */

    const filterButtons = document.querySelectorAll(".shop-filter button");

    if (filterButtons.length > 0) {

        filterButtons.forEach(function (btn) {

            btn.addEventListener("click", function () {

                filterButtons.forEach(function (b) {
                    b.classList.remove("active");
                });

                btn.classList.add("active");

                const category = btn.textContent.trim().toLowerCase();

                document.querySelectorAll(".shop-card").forEach(function (card) {

                    if (category === "tous") {
                        card.style.display = "";
                        return;
                    }

                    const cardCategory = card.textContent.toLowerCase();
                    card.style.display = cardCategory.includes(category) ? "" : "none";

                });

            });

        });

    }

});
