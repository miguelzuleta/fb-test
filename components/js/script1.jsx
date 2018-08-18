import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

firebase.initializeApp(config)

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const listItems = results => {
	let list = {}

	if (results !== null) {
		results.docChanges().forEach((change, index) => {
			let docID = change.doc.id.substring(0, 5)

			let data = Object.assign({id: docID}, change.doc.data())

			if (change.type === 'added' || change.type === 'modified') {
				list[docID] = data
			}

			if (change.type === 'removed') {
				list = { remove: docID }
			}
		})
	}

	return list
}

const ListElems = props => {
	let li = Object.values(props.stamp).map(elem => {
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
			stampList: {}
		}
	}

	componentDidMount() {
		console.log('it mounted!')

		this.db.onSnapshot(results => {
			let { stampList } = this.state

			let newListElem = listItems(results)
			let keyToRemove = newListElem['remove']

			if (keyToRemove) {
				delete stampList[keyToRemove]

				newListElem = stampList
			} else {
				newListElem = Object.assign(stampList, newListElem)
			}

			this.setState({
				stampList: newListElem
			})
		})
	}

	addNew() {
		let date = new Date()

		let newDateSet = {
			seconds: date.getSeconds(),
			milliseconds: date.getMilliseconds()
		}

		this.db.doc().set(newDateSet).then(() => {
			console.log('doc successful')
		})
	}

	render() {
		return (
			<div>
				<h1>Testing {this.props.testName}</h1>
				<button onClick={this.addNew.bind(this)}>data</button>
				<ListElems stamp={this.state.stampList}/>
 			</div>
		)
	}
}

const Form = props => {
	return (
		<div>
			<button onClick={props.logClick}>LOG IN</button>
			<button onClick={props.signClick}>SIGN UP</button>
			<input onChange={props.user} placeholder="user" />
			<input onChange={props.pass} placeholder="password" />
		</div>
	)
}

class DOMcontent extends Component {
	constructor() {
		super()

		this.state = {
			loggedIn: false,
			signedIn: false,
			userVal: '',
			passVal: ''
		}
	}

	handleUserVal(event) {
		this.setState({
			userVal: event.target.value
		})
	}

	handlePassVal(event) {
		this.setState({
			passVal: event.target.value
		})
	}

	handleLogin() {
		// this.setState({
		// 	loggedIn: true
		// })

		console.log('logged in')
	}

	handleSignin() {
		// this.setState({
		// 	loggedIn: true
		// })

		console.log('signed in')
	}

	render() {
		// console.log(this.state.userVal)
		if (!this.state.loggedIn) {
			return <Form
				logClick={ this.handleLogin.bind(this) }
				signClick={ this.handleSignin.bind(this) }
				user={ this.handleUserVal.bind(this) }
				pass={ this.handlePassVal.bind(this) }
			/>
		}

		return <Test testName="magic."/>
	}
}

ReactDOM.render(
	<DOMcontent />,
	document.getElementById('main')
)
