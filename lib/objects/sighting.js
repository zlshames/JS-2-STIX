import { BaseObject } from "./baseObject"
import { ObservedData } from './observedData'
import { Identity } from './identity'

class Sighting extends BaseObject {

    count = 0
    firstSeen = null
    lastSeen = null
    sightingOfRef = null
    observedDataRefs = []
    whereSightedRefs = []
    summary = false

    constructor(sightingOfRef) {
        super('sighting')

        this.sightingOfRef = sightingOfRef
    }

    setCount(value) {
        if (!(value instanceof Number))
            throw Error('You can only set the sighting count to a number!')

        this.count = value
    }

    setSummary(value) {
        if (!(value instanceof Boolean))
            throw Error('You can only set summary to a boolean (true/false)!')

        this.count = value
    }

    setSightingOfRef(ref) {
        if (ref instanceof BaseObject)
            this.sightingOfRef = ref.id
        else
            this.sightingOfRef = ref
    }

    addObservedDataRef(ref) {
        if (ref instanceof ObservedData)
            this.observedDataRefs.push(ref.id)
        else
            this.observedDataRefs.push(ref)
    }

    addWhereSightedRefs(ref) {
        if (ref instanceof Identity)
            this.observedDataRefs.push(ref.id)
        else
            this.observedDataRefs.push(ref)
    }

    toJSON() {
        if (!this.sightingOfRef)
            throw Error(`STIX 2.0 requires a reference to the object sighted!`)

        let output = super.toJSON()
        output.sighting_of_ref = this.sightingOfRef
        output.summary = this.summary

        if (this.firstSeen)
            output.first_seen = this.firstSeen
        if (this.lastSeen)
            output.last_seen = this.lastSeen
        if (this.count)
            output.count = this.count
        if (this.observedDataRefs && this.observedDataRefs.length > 0)
            output.observed_data_refs = this.observedDataRefs
        if (this.whereSightedRefs && this.whereSightedRefs.length > 0)
            output.where_sighted_refs = this.whereSightedRefs

        return output
    }
}

export default Sighting