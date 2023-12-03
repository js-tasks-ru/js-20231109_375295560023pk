class Tooltip {
  static instance

  constructor() {
    if (Tooltip.instance) return Tooltip.instance
    Tooltip.instance = this

    this.element = this.createTooltipElement()
  }

  createTooltipElement() {
    const tooltip = document.createElement('div')
    tooltip.className = 'tooltip'

    return tooltip
  }

  divHoverHandler(event) {
    console.log(event)
    const tooltipData = event.target.getAttribute('data-tooltip')

    if (!tooltipData) return
    
    
    this.render(tooltipData)
  }
  
  render(content) {
    this.element.textContent = content
    document.body.append(this.element)
  }

  documentMouseMoveHandler(event) {
    this.element.style.top = `${event.y}px`
    this.element.style.left = `${event.x}px`
  }

  addDocumentMouseMoveListener() {
    document.addEventListener('mousemove', this.documentMouseMoveHandler.bind(this))
  }

  divPointerOutHandler() {
    if (this.element) this.element.remove()
  }

  addDocumentHoverListener() {
    document.addEventListener('pointerover', this.divHoverHandler.bind(this))
  }

  addDocumentPointerOutListener() {
    document.addEventListener('pointerout', this.divPointerOutHandler.bind(this))
  }

  removeDocumentHoverListener() {
    document.removeEventListener('pointerover', this.divHoverHandler.bind(this))
  }

  removeDocumentPointerOutListener() {
    document.removeEventListener('pointerout', this.divPointerOutHandler.bind(this))
  }
  
  removeDocumentMouseMoveListener() {
    document.removeEventListener('mousemove', this.documentMouseMoveHandler.bind(this))
  }

  initialize () {
    this.addDocumentMouseMoveListener()
    this.addDocumentHoverListener()
    this.addDocumentPointerOutListener()
  }

  destroy() {
    this.removeDocumentMouseMoveListener()
    this.removeDocumentHoverListener()
    this.removeDocumentPointerOutListener()
    this.remove()
  }

  remove() {
    if (this.element) this.element.remove()
  }
}

export default Tooltip;
