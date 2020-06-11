// //step3

// <temp>
// 	<h1>Hello, world!</h1>
// 	<h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
// 	{}
// 	<Radio key="123" value="234" checked="true">
// 		<div>这是文本</div>
// 	</Radio>
// </temp>
// import Radio from 'common/radio'
// // export component
// export default {
// 	name: 'test',
// 	props: { show: { type: Boolean } },

// 	data() {
// 		return { date: new Date() }
// 	},

// 	methods: {
// 		tick() {
// 			this.date = new Date()
// 		}
// 	},
// 	onHide() {
// 		this.timerID = setInterval(() => this.tick(), 1000)
// 	},

// 	onUnload() {
// 		var foo = "123";
// 		clearInterval(this.timerID)
// 	},
// 	components: { Radio }
// };

// to 


// 	< temp >
// 	<h1>Hello, world!</h1>
// 	<h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
//   { }
// <Radio key="123" value="234" checked="true">
// 	<div>这是文本</div>
// </Radio>
//   </temp >
// import Radio from 'common/radio'
// // export component
// export default {
// 	name: 'test',

// 	wbox: {
// 		onHide() {
// 			this.timerID = setInterval(() => this.tick(), 1000)
// 		},

// 		onUnload() {
// 			var foo = "123";
// 			clearInterval(this.timerID)
// 		}
// 	},

// 	props: { show: { type: Boolean } },

// 	data() {
// 		return { date: new Date() }
// 	},

// 	methods: {
// 		tick() {
// 			this.date = new Date()
// 		}
// 	},

// 	onHide() {
// 		this.timerID = setInterval(() => this.tick(), 1000)
// 	},

// 	onUnload() {
// 		var foo = "123";
// 		clearInterval(this.timerID)
// 	},

// 	components: { Radio }
// };



// //step3

// <temp>
// 	<h1>Hello, world!</h1>
// 	<h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
// 	{}
// 	<Radio key="123" value="234" checked="true">
// 		<div>这是文本</div>
// 	</Radio>
// </temp>
// import Radio from 'common/radio'
// // export component
// export default {
// 	name: 'test',
// 	props: { show: { type: Boolean } },

// 	data() {
// 		return { date: new Date() }
// 	},

// 	methods: {
// 		tick() {
// 			this.date = new Date()
// 		}
// 	},
// 	onHide() {
// 		this.timerID = setInterval(() => this.tick(), 1000)
// 	},

// 	onUnload() {
// 		var foo = "123";
// 		clearInterval(this.timerID)
// 	},
// 	components: { Radio }
// };

// to 

{/* <temp>
	<h1>Hello, world!</h1>
	<h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
	{}
	<Radio key="123" value="234" checked="true">
		<div>这是文本</div>
	</Radio>
</temp>
import Radio from 'common/radio'
// export component
export default {
	name: 'test',

	wbox: {
		onHide() {
			this.timerID = setInterval(() => this.tick(), 1000)
		},

		onUnload() {
			var foo = "123";
			clearInterval(this.timerID)
		}
	},

	props: { show: { type: Boolean } },

	data() {
		return { date: new Date() }
	},

	methods: {
		tick() {
			this.date = new Date()
		}
	},

	rubbish8: {},
	rubbish9: {},
	components: { Radio }
}; */}




export default function transformer(file, api) {
	const j = api.jscodeshift;

	const root = j(file.source);

	let properties = [];

	const findApis = path => {
		const name = path.node.key.name;

		if (name.indexOf('on') === 0) {
			properties.push(path.node);
		}
	}

	// const removeApis = path => {
	// 	const name = path.node.key.name;
	// 	if (name.indexOf('on') === 0) {
	// 		path.node.replaceWith();
	// 	}
	// }


	root.find(j.Property).forEach(findApis);
	root.find(j.Property)
		.forEach((path, idx) => {
			const name = path.node.key.name;
			if (name.indexOf('on') === 0) {
				j(path).replaceWith(j.objectProperty(j.identifier("rubbish" + idx), j.objectExpression([])));
			}

		})

	root
		.find(j.Property, { key: { name: "name" } })
		.forEach(path => {
			j(path).insertAfter(j.objectProperty(j.identifier("wbox"), j.objectExpression(properties)))
		})


	return root.toSource();
}