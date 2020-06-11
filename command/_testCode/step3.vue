<temp>
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
  props: {show: {type: Boolean}},

  data () {
    return {date: new Date()}
  },

  methods: {
    tick () {
      this.date = new Date()
    }
  },
  onHide () {
    this.timerID = setInterval(() => this.tick(), 1000)
  },

  onUnload () {
    var foo = "123";
    clearInterval(this.timerID)
  },
  components: {Radio}
};
