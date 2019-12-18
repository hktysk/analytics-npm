import blessed from 'blessed'
import contrib from 'blessed-contrib'
import Main from './Main'

export default class {

  constructor(
    public screen: blessed.Widgets.Screen
  ) {}

  key(key: string | string[], callback: any) {
    this.screen.key(key, callback)
  }

  grid: contrib.grid = new contrib.grid({
    rows: 20,
    cols: 20,
    screen: this.screen
  })

  Main: Main = new Main(this.screen, this.grid)

  hide() {
    this.Main.packages.hide();
  }

  show(s: any) {
    this.hide()
    for (const k in s) {
      if ('show' in s[k]) s[k].show()
    }
    this.screen.render()
  }

  init() {
    this.hide()
    this.show(this.Main)
    this.Main.packages.focus()
  }

  render() {
    this.screen.render()
  }
}
