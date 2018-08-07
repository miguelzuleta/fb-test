import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp(config);

const ol = document.querySelector('main ol')
const dateBtn = document.querySelector('.date')

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })


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

