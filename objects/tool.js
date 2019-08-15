import BaseObject from "./baseObject"
import KillChainPhase from './killChainPhase'
import { ToolLabels } from '../constants/vocabulary'

class Tool extends BaseObject {

    name = null
    description = null
    killChainPhases = []
    toolVersion = null
    
    constructor(name) {
        super('tool')

        this.name = name
    }

    addKillChainPhase(phase) {
        if (!(phase instanceof KillChainPhase))
            throw Error('You can only add a kill chain phase of the KillChainPhase type!')
            
        this.killChainPhases.push(phase)
    }

    addLabel(label) {
        if (Object.values(ToolLabels).indexOf(label.toLowerCase()) === -1)
            throw Error(`Invalid tool label! Must be one of the following: ${Array(Object.values(ToolLabels)).join(', ')}`)

        this.labels.append(label.toLowerCase())
    }

    toJSON() {
        if (!this.labels)
            throw Error(`STIX 2.0 requires tool labels!`)
        if (!this.name)
            throw Error(`STIX 2.0 requires a tool name!`)

        let output = super.toJSON()
        output.name = this.name

        if (this.description)
            output.description = this.description
        if (this.toolVersion)
            output.tool_version = this.toolVersion
        if (this.labels)
            output.labels = this.labels

        let killChainPhases = []
        for (let i in this.killChainPhases)
            killChainPhases.push(i.toJSON())

        if (this.killChainPhases)
            output.kill_chain_phases = killChainPhases

        return output
    }
}

export default Tool