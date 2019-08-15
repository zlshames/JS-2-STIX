import { BaseObject } from "./baseObject"
import { KillChainPhase } from './killChainPhase'

class AttackPattern extends BaseObject {

    name = null
    description = null
    killChainPhases = []
    
    constructor(name) {
        super('attack-pattern')

        this.name = name
    }

    addKillChainPhase(phase) {
        if (!(phase instanceof KillChainPhase))
            throw Error('You can only add a kill chain phase of the KillChainPhase type!')
            
        this.killChainPhases.push(phase)
    }

    toJSON() {
        if (!this.name)
            throw Error(`STIX 2.0 requires an attack pattern name!`)

        let output = super.toJSON()
        output.name = this.name

        if (this.description)
            output.description = this.description

        if (this.killChainPhases && this.killChainPhases.length > 0) {
            let killChainPhases = []
            for (let i of this.killChainPhases)
                killChainPhases.push(i.toJSON())
            output.kill_chain_phases = killChainPhases
        }

        return output
    }
}

export default AttackPattern