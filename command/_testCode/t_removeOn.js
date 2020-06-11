// step4
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

	onHide() {
		this.timerID = setInterval(() => this.tick(), 1000)
	},

	onUnload() {
		var foo = "123";
		clearInterval(this.timerID)
	},

	components: { Radio }
};


to


	< temp >
	<h1>Hello, world!</h1>
	<h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
  { }
<Radio key="123" value="234" checked="true">
	<div>这是文本</div>
</Radio>
  </temp >
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

	components: { Radio }
}; */}



const DEPRECATED_APIS = Object.create(null);
DEPRECATED_APIS.onShow = 'mounted';
DEPRECATED_APIS.mounted = 'onHide';
DEPRECATED_APIS.onUnload = 'onUnload';

export default function transformer(file, api) {
	const j = api.jscodeshift;

	const root = j(file.source);


	root.find(j.Property)
		//.filter( p => p.node.key.name !== 'wbox')
		.forEach(path => {
			const name = path.node.key.name;
			if (name.indexOf('on') === 0) {
				j(path).replaceWith();
			}

		})


	return root.toSource();
}

