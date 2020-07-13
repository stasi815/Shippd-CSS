class ShippdSlides extends HTMLElement {
    constructor() {
      super()

      // Use this.getAttribute to get the width, height, time, and transition
      this._width = this.getAttribute('width')
      this._height = this.getAttribute('height')
      this._time = this.getAttribute('time')
      this._transition = this.getAttribute('transition')

      this._shadowRoot = this.attachShadow({ mode: 'open' })

      this._container = document.createElement('div')
      this._container.style.width = this._width + 'px'
      this._container.style.height = this._height + 'px'
      this._container.style.border = '1px solid'
      this._container.style.overflow = 'hidden'

      this._inner = document.createElement('div')
      this._inner.style.display = 'flex'
      this._inner.style.transition = this._transition + 'ms'

      this._container.appendChild(this._inner)

      this._shadowRoot.appendChild(this._container)

      this._imgs = Array.from(this.querySelectorAll('img'))
      for (let i = 0; i < this._imgs.length; i += 1) {
        this._inner.appendChild(this._imgs[i])
      }

      this._index = 0

    }

    _addTimer() {
      console.log(this._time, this._transition)
      console.log(this._inner.style.transition)
      this._timer = setInterval(() => {
        this._nextImg()
      }, this._time)

    }

    _removeTimer() {
      clearInterval(this._timer)

    }

    connectedCallback() {
      this._addTimer()
      this._nextImg()
    }

    disconnectedCallback() {
      this._removeTimer()
    }

    static get observedAttributes() {
      return ['time', 'transition']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch(name) {
        case 'time':
          this._time = newValue
          this._removeTimer()
          this._addTimer()
          break

        case 'transition':
          this._transition = newValue
          this._inner.style.transition = `${this._transition}ms`
          break
      }
    }

    _nextImg() {
      this._index = (this._index + 1) % this._imgs.length
      const x = this._index * -this._width
      this._inner.style.transform = `translate(${x}px, 0)`
    }
  }

  customElements.define('shippd-slides', ShippdSlides)