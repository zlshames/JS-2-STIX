import BaseObject from "./baseObject"
import { AttackMotivations, AttackResourceLevels } from '../constants/vocabulary'

class IntrusionSet extends BaseObject {

    name = null
    description = null
    aliases = []
    firstSeen = null
    lastSeen = null
    goals = []
    resourceLevel = null
    primaryMotivation = null
    secondaryMotivations = null
    
    constructor(name) {
        super('intrusion-set')

        this.name = name
    }

    set resourceLevel(level) {
        if (Object.values(AttackResourceLevels).indexOf(level.toLowerCase()) === -1)
            throw Error(`Invalid resource level! Must be one of the following: ${Array(Object.values(AttackResourceLevels)).join(', ')}`)

        this.resourceLevel = level.toLowerCase()
    }

    addAlias(alias) {
        if (this.aliases.indexOf(alias.toLowerCase()) === -1)
            this.aliases.push(alias)
    }

    addPrimaryMotivation(motivation) {
        if (Object.values(AttackMotivations).indexOf(motivation.toLowerCase()) === -1)
            throw Error(`Invalid motivation! Must be one of the following: ${Array(Object.values(AttackMotivations)).join(', ')}`)

        this.primaryMotivation = motivation.toLowerCase()
    }

    addSecondaryMotivation(motivation) {
        if (Object.values(AttackMotivations).indexOf(motivation.toLowerCase()) === -1)
            throw Error(`Invalid motivation! Must be one of the following: ${Array(Object.values(AttackMotivations)).join(', ')}`)

        if (this.primaryMotivation !== motivation && this.secondaryMotivations.indexOf(motivation.toLowerCase()) === -1)
            this.secondaryMotivations.push(motivation.toLowerCase())
    }

    toJSON() {
        if (!this.name)
            throw Error(`STIX 2.0 requires an intrusion set name!`)

        let output = super.toJSON()
        output.name = this.name

        if (this.description)
            output.description = this.description
        if (this.aliases)
            output.aliases = this.aliases
        if (this.firstSeen)
            output.first_seen = this.firstSeen
        if (this.lastSeen)
            output.last_seen = this.lastSeen
        if (this.goals)
            output.goals = this.goals
        if (this.resourceLevel)
            output.resource_level = this.resourceLevel
        if (this.primaryMotivation)
            output.primary_motivation = this.primaryMotivation
        if (this.secondaryMotivations)
            output.secondary_motivations = this.secondaryMotivations

        return output
    }
}

export default IntrusionSet