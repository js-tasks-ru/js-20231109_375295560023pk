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

  divHoverHandler = (event) => {
    const tooltipData = event.target.getAttribute('data-tooltip')

    if (!tooltipData) return
    
    
    this.render(tooltipData)
  }
  
  render(content) {
    this.element.textContent = content
    document.body.append(this.element)
  }

  documentMouseMoveHandler = (event) => {
    this.element.style.top = `${event.y}px`
    this.element.style.left = `${event.x}px`
  }

  addDocumentListeners() {
    document.addEventListener('mousemove', this.documentMouseMoveHandler)
    document.addEventListener('pointerover', this.divHoverHandler)
    document.addEventListener('pointerout', this.divPointerOutHandler)
  }

  divPointerOutHandler = () => {
    if (this.element) this.element.remove()
  }

  removeDocumentListeners() {
    document.removeEventListener('pointerover', this.divHoverHandler)
    document.removeEventListener('pointerout', this.divPointerOutHandler)
    document.removeEventListener('mousemove', this.documentMouseMoveHandler)
  }

  initialize () {
    this.addDocumentListeners()
  }

  destroy() {
    this.removeDocumentListeners()
    this.remove()
  }

  remove() {
    if (this.element) this.element.remove()
  }
}

export default Tooltip;
