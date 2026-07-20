/* ========================================= */
/* SCRIPT PRINCIPAL */
/* FN BUSINESS AGENCY */
/* ========================================= */



// Attendre que la page soit complètement chargée

document.addEventListener("DOMContentLoaded", () => {



    console.log("FN Business Agency est chargé avec succès");





    /* ========================================= */
    /* ANNEE AUTOMATIQUE DANS LE FOOTER */
    /* ========================================= */


    const year = document.querySelector(".copyright p");


    if(year){

        const currentYear = new Date().getFullYear();

        year.innerHTML =
        `© ${currentYear} FN Business Agency.
        Tous droits réservés.`;

    }






    /* ========================================= */
    /* MENU MOBILE */
    /* ========================================= */


    const menu = document.querySelector(".menu");

    const menuButton = document.querySelector(".menu-toggle");



    if(menuButton){


        menuButton.addEventListener("click", () => {


            menu.classList.toggle("active");


            menuButton.classList.toggle("open");


        });


    }



});
/* ========================================= */
/* COMPTE A REBOURS PROMOTION */
/* ========================================= */


const countdownDate = new Date();

countdownDate.setDate(
    countdownDate.getDate() + 7
);



function updateCountdown(){


    const now = new Date().getTime();


    const distance = countdownDate - now;



    if(distance > 0){


        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );


        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );


        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );



        document.getElementById("days").textContent = days;

        document.getElementById("hours").textContent = hours;

        document.getElementById("minutes").textContent = minutes;

        document.getElementById("seconds").textContent = seconds;


    }

}



setInterval(updateCountdown,1000);

updateCountdown();







/* ========================================= */
/* DEFILEMENT DES MARQUES */
/* ========================================= */


const brandTrack = document.querySelector(".brand-track");


if(brandTrack){


    brandTrack.addEventListener(
        "mouseenter",
        () => {

            brandTrack.style.animationPlayState = "paused";

        }
    );



    brandTrack.addEventListener(
        "mouseleave",
        () => {

            brandTrack.style.animationPlayState = "running";

        }
    );


}
/* ========================================= */
/* FILTRE PRODUITS */
/* ========================================= */


const filterButtons =
document.querySelectorAll(".shop-filter button");


const products =
document.querySelectorAll(".shop-card");



filterButtons.forEach(button => {


    button.addEventListener("click", () => {



        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });



        button.classList.add("active");



        const category =
        button.textContent.toLowerCase();




        products.forEach(product => {



            const productCategory =
            product.querySelector(".category")
            ?.textContent
            .toLowerCase();




            if(
                category === "tous" ||
                productCategory === category
            ){

                product.style.display = "block";


            }else{


                product.style.display = "none";


            }



        });



    });



});






/* ========================================= */
/* FAVORIS */
/* ========================================= */


const favoriteButtons =
document.querySelectorAll(".btn-favorite");



favoriteButtons.forEach(button => {



    button.addEventListener("click",()=>{


        button.classList.toggle("liked");



        if(button.classList.contains("liked")){


            button.innerHTML =
            "❤️";


        }else{


            button.innerHTML =
            "♡";


        }



    });


});
/* ========================================= */
/* PANIER */
/* ========================================= */


let cart = [];



const cartButtons =
document.querySelectorAll(".cart-btn, .btn-cart");



cartButtons.forEach(button => {



    button.addEventListener("click",()=>{



        const card =
        button.closest(".shop-card, .product-card");



        if(card){


            const product = {


                name:
                card.querySelector("h3").textContent,


                price:
                card.querySelector(".price").textContent,


                image:
                card.querySelector("img").src


            };



            cart.push(product);



            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );



            alert(
            product.name +
            " ajouté au panier"
            );



        }



    });


});





/* Charger panier existant */


const savedCart =
localStorage.getItem("cart");



if(savedCart){


    cart = JSON.parse(savedCart);


}
/* ========================================= */
/* AFFICHAGE DU PANIER */
/* ========================================= */


function displayCart(){


    const cartContainer =
    document.querySelector(".cart-items");


    const totalElement =
    document.querySelector(".cart-total");



    if(!cartContainer) return;



    cartContainer.innerHTML = "";



    let total = 0;



    cart.forEach((item,index)=>{


        total += Number(
            item.price.replace(/[^0-9]/g,"")
        );



        const cartItem =
        document.createElement("div");



        cartItem.classList.add("cart-item");



        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <h3>${item.name}</h3>

            <p>${item.price}</p>

            <button class="remove-item"
            data-index="${index}">
                Supprimer
            </button>

        `;



        cartContainer.appendChild(cartItem);



    });



    if(totalElement){

        totalElement.textContent =
        total + " €";

    }



    removeCartItem();


}





/* SUPPRESSION PRODUIT */


function removeCartItem(){


    const removeButtons =
    document.querySelectorAll(".remove-item");



    removeButtons.forEach(button=>{


        button.addEventListener("click",()=>{


            const index =
            button.dataset.index;



            cart.splice(index,1);



            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );



            displayCart();


        });


    });


}



displayCart();
/* ========================================= */
/* FORMULAIRE CONTACT */
/* ========================================= */


const forms =
document.querySelectorAll("form");



forms.forEach(form=>{


    form.addEventListener("submit",(e)=>{


        e.preventDefault();



        alert(
        "Merci ! Votre message a été envoyé."
        );



        form.reset();


    });


});






/* ========================================= */
/* APPARITION AU SCROLL */
/* ========================================= */


const animatedElements =
document.querySelectorAll(
".product-card, .shop-card, .service-card, .blog-card, .stat-box"
);



const observer =
new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.style.opacity = "1";

            entry.target.style.transform =
            "translateY(0)";


        }


    });



},
{
    threshold:0.15
});




animatedElements.forEach(element=>{


    element.style.opacity = "0";

    element.style.transform =
    "translateY(40px)";

    element.style.transition =
    "0.6s ease";


    observer.observe(element);


});