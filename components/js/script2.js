// let fn = (...args) => args.map(elem => elem / 2)

// console.log( fn(4, 6, 9, 10, 1) )


firebase.initializeApp(config)


// const db = firebase.database()

const preObj = document.querySelector('#obj')
const ol = document.querySelector('main ol')
const numBtnT = document.querySelector('.num-t')
const numBtnD = document.querySelector('.num-d')
const logInBtn = document.querySelector('.log-in')
const logOutBtn = document.querySelector('.log-out')

const email = document.querySelector('.email')
const password = document.querySelector('.password')

// reference
const workDB = firebase.database().ref()
const workYadda = firebase.database().ref('/yadda')
// console.log(workDB)
// console.log(workYadda)

let savedNum

// workYadda.update( { 'new': 0 } )
workYadda.once('value').then(snap => {
	savedNum = snap.val().new
})

numBtnT.addEventListener('click', () => {
	workYadda.update( { 'new': (savedNum * 7).toFixed(2) } )
})

numBtnD.addEventListener('click', () => {
	workYadda.update( { 'new': (savedNum / 9).toFixed(2) } )
})

logInBtn.addEventListener('click', () => {
	let auth = firebase.auth()

	let signIn = auth.signInWithEmailAndPassword(email.value, password.value)

	signIn.catch(evt => {
		console.log(evt.message)
	})
})

logOutBtn.addEventListener('click', () => {
	
})

// sync object
workYadda.on('value', snap => {
	console.log('value changed')
	console.log(snap.val().new)
	savedNum = snap.val().new
	// savedNum = snap.val()
})

// sync object
workYadda.on('child_added', snap => {
	let list = document.createElement('li')
	list.id = snap.key
	list.innerText = snap.val()
	ol.appendChild(list)
	// console.log(snap.val())
})

workYadda.on('child_changed', snap => {
	let liChanged = document.getElementById(snap.key)
	liChanged.innerText = snap.val()
})

workYadda.on('child_removed', snap => {
	let liChanged = document.getElementById(snap.key)
	liChanged.remove()
})

// console.log('db on')

