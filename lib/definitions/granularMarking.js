import { Marking } from './marking'

class GranularMarking {

    markingRef = null
    selectors = []
    
    constructor() {
        // Nothing for now
    }

    setMarkingRef(marking) {
        if (marking instanceof Marking) {
            this.markingRef = marking.id
        } else {
            this.markingRef = marking
        }
    }

    addSelector(selector) {
        if (!(selector instanceof String))
            throw Error('A selector must be a string!')

        this.selectors.push(selector)
    }

    toJSON() {
        if (!this.markingRef)
            throw Error('STIX 2.0 requires a reference to a marking definition!')

        return  {
            marking_ref: this.markingRef,
            selectors: this.selectors
        }
    }
}

export default GranularMarking