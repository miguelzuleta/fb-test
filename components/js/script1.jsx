import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

firebase.initializeApp(config)

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const listItems = results => {

	let list = []

	if (results !== null) {
		list = results.docChanges().map((change, index) => {
			let docID = {
				id: change.doc.id.substring(0, 5)
			}
			let data = Object.assign(docID, change.doc.data())

			if (change.type === 'added') {
				console.log(data)
				return data
			}
		})
	}

	return list
}

const ListElems = props => {
	let li = props.stamp.map(elem => {
		return (
			<li data-id={elem.id} key={elem.id}>
				{elem.seconds} - {elem.milliseconds}
			</li>
		)
	})

	return (
		<ol>{ li }</ol>
	)
}

class Test extends Component {
	constructor() {
		super()

		this.db = db.collection('time-stamps')

		this.state = {
			stampList: []
		}
	}

	componentDidMount() {
		console.log('it mounted!')

		this.db.onSnapshot(results => {
			let growingList = this.state.stampList.concat(listItems(results))

			this.setState({
				stampList: growingList
			})
		})
	}

	addNew() {
		let date = new Date()

		let newDateSet = {
			seconds: date.getSeconds(),
			milliseconds: date.getMilliseconds()
		}

		this.db.doc().set(newDateSet, { merge: true }).then(() => {
			console.log('doc successful')
		})
	}

	render() {
		return (
			<div>
				<h1>Testing {this.props.nee}</h1>
				<button onClick={ this.addNew.bind(this) } className="date">data</button>
				<ListElems stamp={this.state.stampList}/>
 			</div>
		)
	}
}

ReactDOM.render(
	<Test nee="this thing."/>,
	document.getElementById('react-test')
)



// const ol = document.querySelector('main ol')
// const dateBtn = document.querySelector('.date')

// const db = firebase.firestore()
// db.settings({ timestampsInSnapshots: true })


// dateBtn.addEventListener('click', () => {
// 	let date = new Date()

// 	db.collection('time-stamps').doc().set({
// 		seconds: date.getSeconds(),
// 		milliseconds: date.getMilliseconds()
// 	}).then(result => {
// 		console.log('shit went in!')
// 	})
// })

// db.collection('time-stamps')
// 	.onSnapshot(results => {

// 	results.docChanges().forEach(change => {

// 		let data = change.doc.data()
// 		let docEl = document.querySelector(`[data-id="${change.doc.id}"]`)
// 		console.log(data)

// 		if (change.type === 'removed') {
// 			docEl.remove()
// 			console.log('DOCUMENT REMOVED')
// 		}

// 		if (change.type === 'modified') {
// 			docEl.innerText = data.milliseconds
// 			console.log('DOCUMENT MODIFIED')
// 		}

// 		if (change.type === 'added') {
// 			let list = document.createElement('li')
// 			list.setAttribute('data-id', change.doc.id)
// 			list.innerText = `${data.milliseconds} - ${data.seconds}`
// 			ol.appendChild(list)
// 			console.log('DOCUMENT ADDED')
// 		}

// 	})

// })

