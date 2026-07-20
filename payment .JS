document
.getElementById("checkoutForm")
.addEventListener("submit", function(e){


e.preventDefault();



let payment =
document.querySelector(
'input[name="payment"]:checked'
).value;



if(payment === "momo"){


alert(
"Redirection vers Mobile Money..."
);


// Ici on appellera l'API Mobile Money


}



if(payment === "stripe"){


alert(
"Ouverture du paiement sécurisé Stripe..."
);


// Ici on appellera Stripe Checkout


}



if(payment === "paypal"){


alert(
"Ouverture de PayPal..."
);


}



});