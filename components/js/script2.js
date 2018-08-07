import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp(config);

// const preObj = document.querySelector('#obj')
const ol = document.querySelector('main ol')
// const numBtnT = document.querySelector('.num-t')
// const numBtnD = document.querySelector('.num-d')
// const logInBtn = document.querySelector('.log-in')
// const logOutBtn = document.querySelector('.log-out')
// const signUp = document.querySelector('.sign-up')
const dateBtn = document.querySelector('.date')

// const email = document.querySelector('.email')
// const password = document.querySelector('.password')

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

// db.collection("testing").doc("doc2").set({
// 	moreDocs: "this is coooo"
// }, { merge: true})


// db.collection("testing").doc().set({
// 	namename: 'asdasdasd,'
// })


dateBtn.addEventListener('click', () => {
	let date = new Date()

	db.collection('time-stamps').doc().set({
		seconds: date.getSeconds(),
		milliseconds: date.getMilliseconds()
	}).then(result => {
		console.log('shit went in!')
	})
})

db.collection('time-stamps')
	.onSnapshot(results => {

	results.docChanges().forEach(change => {

		let data = change.doc.data()
		let docEl = document.querySelector(`[data-id="${change.doc.id}"]`)
		console.log(data)

		if (change.type === 'removed') {
			docEl.remove()
			console.log('DOCUMENT REMOVED')
		}

		if (change.type === 'modified') {
			docEl.innerText = data.milliseconds
			console.log('DOCUMENT MODIFIED')
		}

		if (change.type === 'added') {
			let list = document.createElement('li')
			list.setAttribute('data-id', change.doc.id)
			list.innerText = `${data.milliseconds} - ${data.seconds}`
			ol.appendChild(list)

			console.log('DOCUMENT ADDED')
		}

	})

})


// reference
// const workDB = firebase.database().ref()
// const workYadda = db.collection('testing').doc('nee')

// let savedNum = 0

// workYadda.onSnapshot(doc => {
// 	console.log(doc.data())
// })

// numBtnT.addEventListener('click', () => {
// 	workYadda.update( { 'dd': (savedNum * 7.7).toFixed(2) } )
// })

// numBtnD.addEventListener('click', () => {
// 	workYadda.update( { 'dd': (savedNum / 9.9).toFixed(2) } )
// })

// logInBtn.addEventListener('click', () => {
// 	let auth = firebase.auth()

// 	let signIn = auth.signInWithEmailAndPassword(email.value, password.value)

// 	signIn.then(evt => {
// 		console.log("YOU'RE LOGGED IN!")
// 	}).catch(evt => {
// 		console.log(evt.message)
// 	})
// })

// logOutBtn.addEventListener('click', () => {
// 	firebase.auth().signOut()
// })

// signUp.addEventListener('click', () => {
// 	let auth = firebase.auth()

// 	let signIn = auth.createUserWithEmailAndPassword(email.value, password.value)

// 	signIn.then(e => {
// 		console.log("YOU'RE ALL SIGNED UP!")
// 	}).catch(evt => {
// 		console.log(evt.message)
// 	})
// })

// firebase.auth().onAuthStateChanged(firebaseUser => {
// 	if (firebaseUser) {
// 		console.log(firebaseUser)
// 	} else {
// 		console.log('NOT LOGGED IN')
// 	}
// })





// sync object
// workYadda.on('value', snap => {
// 	console.log('value changed')
// 	console.log(snap.val().new)
// 	savedNum = snap.val().new
// })

// sync object
// workYadda.on('child_added', snap => {
// 	let list = document.createElement('li')
// 	list.id = snap.key
// 	list.innerText = snap.val()
// 	ol.appendChild(list)
// })

// workYadda.on('child_changed', snap => {
// 	let liChanged = document.getElementById(snap.key)
// 	liChanged.innerText = snap.val()
// })

// workYadda.on('child_removed', snap => {
// 	let liChanged = document.getElementById(snap.key)
// 	liChanged.remove()
// })
