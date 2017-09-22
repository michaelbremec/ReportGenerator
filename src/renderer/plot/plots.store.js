/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

import Plot from './plot-frame'

export default {
  state: {
    plots: [],
    arePlotsModified: false
  },

  getters: {
    plots: state => state.plots,
    arePlotsModified: state => state.arePlotsModified,
    getByID: (state) => (id) => {
      return state.plots.find(p => p.id === id)
    }
  },

  mutations: {
    addPlot(state) {
      const plotId = state.plots.length + 1
      let p = new Plot(plotId)
      p.title = `Plot ${plotId}`
      state.plots.push(p)
    },

    addCurve(state, payload) {
      payload.plot.addCurve()
    },

    selectCurve(state, payload) {
      payload.plot.selectedCurve = payload.curve
      // state.arePlotsModified = false
    },

    createFromList(state, rawPlots) {
      if (state.plots.length !== 0) {
        this.reset()
      }

      // Create set of Plot based on a list of objects
      for (let v of rawPlots) {
        const plotId = state.plots.length + 1
        // noinspection JSUnfilteredForInLoop
        state.plots.push(new Plot(plotId, v.title, v.date_begin, v.date_end, v.curves))
      }
    },

    reset(state) {
      state.plots = []
      state.arePlotsModified = false
    },

    plotsModified(state) {
      state.arePlotsModified = true
    },

    resetPlotsModified(state) {
      state.arePlotsModified = false
    }
  }
}
