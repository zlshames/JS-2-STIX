import BaseObject from "./baseObject"
import { IndicatorLabels } from '../constants/vocabulary'

class Indicator extends BaseObject {

    name = null
    description = null
    pattern = null
    validFrom = null
    validUntil = null
    killChainPhases = []

    
    constructor() {
        super('indicator')
    }

    addKillChainPhase(phase) {
        if (!(phase instanceof KillChainPhase))
            throw Error('You can only add a kill chain phase of the KillChainPhase type!')
            
        this.killChainPhases.push(phase)
    }

    addLabel(label) {
        if (Object.values(IndicatorLabels).indexOf(label.toLowerCase()) === -1)
            throw Error(`Invalid indicator label! Must be one of the following: ${Array(Object.values(IndicatorLabels)).join(', ')}`)

        this.labels.append(label.toLowerCase())
    }

    toJSON() {
        if (!this.labels)
            throw Error(`STIX 2.0 requires indicator labels!`)
        if (!this.pattern)
            throw Error(`STIX 2.0 requires an indicator pattern!`)
        if (!this.validFrom)
            throw Error(`STIX 2.0 requires a valid from timestamp!`)

        let output = super.toJSON()
        output.labels = this.labels
        output.pattern = this.pattern
        output.valid_from = this.validFrom

        if (this.description)
            output.description = this.description
        if (this.name)
            output.name = this.name
        if (this.validUntil)
            output.valid_until = this.validUntil
        if (this.killChainPhases)
            output.kill_chain_phases = this.killChainPhases

        return output
    }
}

export default Indicator