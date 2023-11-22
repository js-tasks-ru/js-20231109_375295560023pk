export default class ColumnChart {
  element = document.createElement("div");
  
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

    this.element.classList.add('column-chart')
    if (this.data?.length === 0) this.element.classList.add('column-chart_loading')
    this.element.style.setProperty('--chart-height', this.chartHeight)

    this.element.innerHTML = this.createTemplate()

  }
  
  update(newData) {
    this.data = newData
    this.element.innerHTML = this.createTemplate()
  }

  
  createTemplate() {
    return `
      <div class="column-chart__title">
            Total ${this.label}
            ${this.getLink()}
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.formatHeading ? this.formatHeading(this.formatedValue) : this.value}</div>
            <div data-element="body" class="column-chart__chart">
                ${this.generateColumns()}
            </div>
      </div>`
  }
  
  getLink() {
    return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : ''
  }
  
  generateColumns() {
    const columns = []
    const maximum = Math.max(...this.data)
  
    for (let item of this.data) {
      columns.push(`<div style="--value: ${Math.floor(item * 50 / maximum)}" data-tooltip="${Math.round(item * 100 / maximum)}%"></div>`);
    }
  
    return columns.join('');
  }

  destroy() {
    this.element = null
  }

  remove() {
    this.element.remove()
  }
}
