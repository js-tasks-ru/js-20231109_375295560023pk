export default class ColumnChart {
  ;
  
  constructor({data = [], label = '', value = 0, link = '', formatHeading} = {}) {
    this.data = data
    this.label = label
    this.value = value
    this.link = link
    this.formatHeading = formatHeading
    
    this.chartHeight = 50

    if (this.formatHeading) {
      this.formatedValue = new Intl.NumberFormat('en').format(this.value)
    }

    this.element = this.getElement()

  }

  getElement() {
    const element = document.createElement("div")

    element.classList.add('column-chart')
    element.style.setProperty('--chart-height', this.chartHeight)

    if (this.data?.length === 0) element.classList.add('column-chart_loading')

    element.innerHTML = this.createTemplate()

    return element
  }
  
  update(newData) {
    this.data = newData
    this.element.innerHTML = this.createTemplate()
  }

  
  createTemplate() {
    return `
      <div class="column-chart__title">
            Total ${this.label}
            ${this.getLinkTemplate()}
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.formatHeading ? this.formatHeading(this.formatedValue) : this.value}</div>
            <div data-element="body" class="column-chart__chart">
                ${this.createColumnsTemplate()}
            </div>
      </div>`
  }
  
  getLinkTemplate() {
    return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : ''
  }
  
  createColumnsTemplate() {
    const columns = []
    const maximum = Math.max(...this.data)
  
    for (let item of this.data) {
      columns.push(`<div style="--value: ${Math.floor(item * this.chartHeight / maximum)}" data-tooltip="${Math.round(item * 100 / maximum)}%"></div>`);
    }
  
    return columns.join('');
  }

  destroy() {
    this.remove()
  }

  remove() {
    this.element.remove()
  }
}
