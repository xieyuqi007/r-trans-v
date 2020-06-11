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
  mounted () {
    this.timerID = setInterval(() => this.tick(), 1000)
  },
  destroyed () {
    clearInterval(this.timerID)
  },
  components: {Radio},
  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.date.toLocaleTimeString()}.</h2>
        <radio key="123" value="234" checked="true">
          <div>这是文本</div>
        </radio>
      </div>
    )
  }
}
