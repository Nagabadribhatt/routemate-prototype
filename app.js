const app = document.getElementById("app")

let walletBalance = 100
let rewardPoints = 0

function home() {
app.innerHTML = `
<div class="container">
<h1>RouteMate</h1>
<p>Community Smart Commute Platform</p>

<div class="wallet">
<p>Wallet Balance: ₹${walletBalance}</p>
<p>Reward Points: ${rewardPoints}</p>
</div>

<div class="actions">
<button onclick="findRide()">Find a Ride</button>
<button onclick="offerRide()">Offer a Ride</button>
</div>
</div>
`
}

function findRide() {
app.innerHTML = `
<div class="container">
<h2>Find a Ride</h2>

<input id="start" placeholder="Start Location">
<input id="destination" placeholder="Destination">

<button onclick="searchRide()">Search Ride</button>
<button onclick="home()">Back</button>
</div>
`
}

function searchRide() {

const start = document.getElementById("start").value
const destination = document.getElementById("destination").value

if(start === "" || destination === ""){
alert("Enter start and destination")
return
}

app.innerHTML = `
<div class="container">
<h2>Available Ride</h2>

<p>Driver: Rahul</p>
<p>Vehicle: Bike</p>
<p>Route: ${start} → ${destination}</p>
<p>Price: ₹40</p>

<button onclick="payRide(40)">Pay with Wallet</button>
<button onclick="home()">Cancel</button>
</div>
`
}

function payRide(amount){

if(walletBalance < amount){
alert("Not enough wallet balance")
return
}

walletBalance -= amount
rewardPoints += 1

app.innerHTML = `
<div class="container">
<h2>Ride Confirmed</h2>

<p>Payment Successful</p>
<p>₹${amount} paid through wallet</p>
<p>You earned 1 reward point</p>

<button onclick="rateRide()">Finish Ride</button>
</div>
`
}

function rateRide(){
app.innerHTML = `
<div class="container">
<h2>Rate Your Ride</h2>

<button onclick="submitRating(5)">⭐⭐⭐⭐⭐</button>
<button onclick="submitRating(4)">⭐⭐⭐⭐</button>
<button onclick="submitRating(3)">⭐⭐⭐</button>

</div>
`
}

function submitRating(rating){
app.innerHTML = `
<div class="container">
<h2>Thank You!</h2>

<p>You rated the ride ${rating} stars</p>

<button onclick="home()">Back to Home</button>
</div>
`
}

function offerRide(){
app.innerHTML = `
<div class="container">
<h2>Offer a Ride</h2>

<input id="start" placeholder="Start Location">
<input id="destination" placeholder="Destination">
<input id="price" placeholder="Price">

<button onclick="publishRide()">Publish Ride</button>
<button onclick="home()">Back</button>
</div>
`
}

function publishRide(){

const start = document.getElementById("start").value
const destination = document.getElementById("destination").value
const price = document.getElementById("price").value

if(start === "" || destination === "" || price === ""){
alert("Fill all fields")
return
}

app.innerHTML = `
<div class="container">
<h2>Ride Published</h2>

<p>${start} → ${destination}</p>
<p>Price: ₹${price}</p>

<button onclick="home()">Back to Home</button>
</div>
`
}

home()
