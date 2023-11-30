export default class NotificationMessage {
  constructor(message = 'Hello World', config = {
    duration: 2000,
    type: 'success'
  }) {
    this.message = message
    this.duration = config?.duration ?? 2000
    this.type = config?.type ?? 'success'

    this.element = this.getElement(this.message, this.type, this.duration)
  }

  getElement(message, type, duration) {
    const element = document.createElement('div')

    element.classList.add('notification')
    element.classList.add(`${type}`)
    element.style.setProperty('--value', `${Math.round(duration / 1000).toFixed(0)}s`)

    element.innerHTML = this.createTemplate(message, type)

    return element
  }

  createTemplate(message, type) {
    return `
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${type}</div>
      <div class="notification-body">
        ${message}
      </div>
    </div>`
  }

  show(targetElement) {
    const notification = document.querySelector('.notification')
    if (notification) notification.remove()

    if (targetElement) {
      targetElement.append(this.element)
      document.body.append(targetElement)
    } else {
      document.body.append(this.element)
    }
    

    setTimeout(() => this.remove(), this.duration)
  }

  destroy() {
    this.remove()
  }

  remove() {
    this.element.remove()
  }
}
