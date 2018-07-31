firebase.initializeApp(config);

const preObj = document.querySelector('#obj')
const ol = document.querySelector('main ol')
const numBtnT = document.querySelector('.num-t')
const numBtnD = document.querySelector('.num-d')
const logInBtn = document.querySelector('.log-in')
const logOutBtn = document.querySelector('.log-out')
const signUp = document.querySelector('.sign-up')

const email = document.querySelector('.email')
const password = document.querySelector('.password')

// reference
const workDB = firebase.database().ref()
const workYadda = firebase.database().ref('/yadda')

let savedNum = 0

// workYadda.update( { 'new': 711 } )
workYadda.once('value').then(snap => {
	savedNum = snap.val().new
})

numBtnT.addEventListener('click', () => {
	workYadda.update( { 'new': (savedNum * 7.7).toFixed(2) } )
})

numBtnD.addEventListener('click', () => {
	workYadda.update( { 'new': (savedNum / 9.9).toFixed(2) } )
})

logInBtn.addEventListener('click', () => {
	let auth = firebase.auth()

	let signIn = auth.signInWithEmailAndPassword(email.value, password.value)

	signIn.then(evt => {
		console.log("YOU'RE LOGGED IN!")
	}).catch(evt => {
		console.log(evt.message)
	})
})

logOutBtn.addEventListener('click', () => {
	firebase.auth().signOut()
})

signUp.addEventListener('click', () => {
	let auth = firebase.auth()

	let signIn = auth.createUserWithEmailAndPassword(email.value, password.value)

	signIn.then(e => {
		console.log("YOU'RE ALL SIGNED UP!")
	}).catch(evt => {
		console.log(evt.message)
	})
})

firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		console.log(firebaseUser)
	} else {
		console.log('NOT LOGGED IN')
	}
})

// sync object
workYadda.on('value', snap => {
	console.log('value changed')
	console.log(snap.val().new)
	savedNum = snap.val().new
})

// sync object
workYadda.on('child_added', snap => {
	let list = document.createElement('li')
	list.id = snap.key
	list.innerText = snap.val()
	ol.appendChild(list)
})

workYadda.on('child_changed', snap => {
	let liChanged = document.getElementById(snap.key)
	liChanged.innerText = snap.val()
})

workYadda.on('child_removed', snap => {
	let liChanged = document.getElementById(snap.key)
	liChanged.remove()
})
