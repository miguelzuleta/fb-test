import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

firebase.initializeApp(config)

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const ListItems = ({results}) => {

	let list = () => <li>blag</li>

	if (results !== null) {
		list = results.docChanges().map(change => {
			console.log('change')
			let data = change.doc.data()

			if (change.type === 'added') {
				return (
					<li id={change.doc.id} key={change.newIndex}>
						{`${data.milliseconds} - ${data.seconds}`}
					</li> 
				)
			}
		})
	}

	return (
		<ol>{ list }</ol>
	)

}

// 	// console.log(list)

// 	// return list

// let arr = 'miguel'.split('')

// let Testing = ({ array }) => {
// 	let list = array.map((letter, index) => {
// 		return (
// 			<li key={index}>
// 				{letter}
// 			</li>
// 		)
// 	})

// 	return (
// 		<ul>{list}</ul>
// 	)
// }



class Test extends Component {
	constructor() {
		super()
		
		this.state = {
			stamps: null
		}

		this.addNew = this.addNew.bind(this)
	}

	componentDidMount() {
		console.log('it mounted!')

		db.collection('time-stamps').onSnapshot(results => {
			this.setState({
				stamps: results
			})
		})		
	}

	addNew() {
		let date = new Date()

		console.log(date)

		db.collection('time-stamps').doc().set({
			seconds: date.getSeconds(),
			milliseconds: date.getMilliseconds()
		}).then(clickResult => {
			console.log('shit went in!')
			// console.log(clickResult)
			// this.setState({
			// 	stamps: clickResult
			// })

			// console.log(this.state.stamps)
		})
	}

	render() {
		return (
			<div>
				<h1>Testing {this.props.nee}</h1>
				<button onClick={ this.addNew } className="date">data</button>
	    		<ListItems results={ this.state.stamps }/>
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

