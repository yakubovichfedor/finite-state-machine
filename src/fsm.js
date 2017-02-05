class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if (!config) {
      throw new Error('Config does not exist!')
    }

    this.initial = config.initial
    this.state = config.initial
    this.states = config.states
    this.undoHistory = []
    this.redoHistory = []
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.state
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    if (!this.states[state]) {
      throw new Error('State with that name does not exist')
    }

    this.redoHistory = []
    this.undoHistory.push(this.state)
    this.state = state
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    if (!this.states[this.state].transitions[event]) {
      throw new Error('That event in the state does not exist')
    }

    this.redoHistory = []
    this.undoHistory.push(this.state)
    this.state = this.states[this.state].transitions[event]
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.state = this.initial
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    let states = []

    if (!event) {
      return Object.keys(this.states)
    }

    for (let item in this.states) {
      if (this.states[item].transitions[event]) {
        states.push(item)
      }
    }

    return states
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (this.undoHistory.length == 0) {
      return false
    }

    this.redoHistory.push(this.state)
    this.state = this.undoHistory.pop()
    return true
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (this.redoHistory == 0) {
      return false
    }

    this.state = this.redoHistory.pop()
    return true
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.undoHistory = []
    this.redoHistory = []
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
