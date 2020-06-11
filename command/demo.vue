import Swiper from 'common/ad-banner'
import './Test.css'
// export component
export default {
  name: 'test',
  props: {},
  data () {
    return {
      flag: true,
      isautoplay: true,
      swiperData: [
        'https://wx2.sinaimg.cn/thumb180/006nphEAgy1gfg23yj124j31kw1kw77p.jpghttps://wx2.sinaimg.cn/thumb180/006nphEAgy1gfg23yj124j31kw1kw77p.jpg',
        'https://wx2.sinaimg.cn/thumb180/006nphEAgy1gfg23yj124j31kw1kw77p.jpg'
      ]
    }
  },
  methods: {
    handleSudaAndJump () {
      console.log('handle')
    }
  },
  mounted () {
    console.log('start')
  },
  destroyed () {
    console.log('over')
  },
  components: {Swiper},
  render () {
    const opts = {
      isautoplay: this.isautoplay.toString(),
      duration: 250
    }
    return(
      <div class="body-wrapper">
        <h1>Hello, world!</h1>
        <swiper {...opts} autoTime={1000} ads={[1, 2]} onChange={this.handleChange}>
          {this.swiperData.map((elem, idx) => {
            return (
              <a
                key={`ads${idx}`}
                class="banner-item swiper-slide"
                onClick={() => {
                  this.handleSudaAndJump(item.h5_link)
                }}
              >
                <img src={elem} alt="" />
              </a>
            )
          })}
        </swiper>
        <div>{this.flag ? <div>111</div> : <div>2222</div>}</div>
        <div>
          {[1, 2].map((item, idx) => {
            return <div key={idx}>{item}</div>
          })}
        </div>
      </div>
    )
  }
}
