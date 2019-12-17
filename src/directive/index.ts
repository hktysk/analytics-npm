import Screen from '../screen'
import main from './main'

export default class {

  constructor(
    public s: Screen
  ) {}

  main = new main(this.s)
}
