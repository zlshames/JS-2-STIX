import { BaseObject } from "./baseObject"
import { ThreatActorLabels, ThreatActorRoles, ThreatActorSophistications, AttackResourceLevels, AttackMotivations } from '../definitions/vocabulary'

class ThreatActor extends BaseObject {

    name = null
    description = null
    aliases = []
    roles = []
    goals = []
    sophistication = null
    resourceLevel = null
    primaryMotivation = null
    secondaryMotivations = []
    personalMotivations = []

    
    constructor(name) {
        super('threat-actor')

        this.name = name
    }

    setSophistication(value) {
        if (Object.values(ThreatActorSophistications).indexOf(value.toLowerCase()) === -1)
            throw Error(`Invalid threat actor sophistication! Must be one of the following: ${Array(Object.values(ThreatActorSophistications)).join(', ')}`)

        this.sophistication = value.toLowerCase()
    }

    setResourceLevel(level) {
        if (Object.values(AttackResourceLevels).indexOf(level.toLowerCase()) === -1)
            throw Error(`Invalid threat actor resource level! Must be one of the following: ${Array(Object.values(AttackResourceLevels)).join(', ')}`)

        this.resourceLevel = level.toLowerCase()
    }

    addAlias(alias) {
        if (this.aliases.indexOf(alias) === -1)
            this.aliases.push(alias)
    }

    addGoal(goal) {
        if (this.goals.indexOf(goal) === -1)
            this.goals.push(goal)
    }

    addRole(role) {
        if (Object.values(ThreatActorRoles).indexOf(role.toLowerCase()) === -1)
            throw Error(`Invalid threat actor role! Must be one of the following: ${Array(Object.values(ThreatActorRoles)).join(', ')}`)

        this.roles.push(role.toLowerCase())
    }

    addLabel(label) {
        if (Object.values(ThreatActorLabels).indexOf(label.toLowerCase()) === -1)
            throw Error(`Invalid threat actor label! Must be one of the following: ${Array(Object.values(ThreatActorLabels)).join(', ')}`)

        this.labels.push(label.toLowerCase())
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

    addPersonalMotivation(motivation) {
        if (Object.values(AttackMotivations).indexOf(motivation.toLowerCase()) === -1)
            throw Error(`Invalid threat actor personal motivation! Must be one of the following: ${Array(Object.values(AttackMotivations)).join(', ')}`)

        this.personalMotivations.push(motivation.toLowerCase())
    }

    toJSON() {
        if (!this.labels)
            throw Error(`STIX 2.0 requires threat actor labels!`)
        if (!this.name)
            throw Error(`STIX 2.0 requires a threat actor name!`)
        if (!this.labels)
            throw Error(`STIX 2.0 requires at least 1 threat actor label!`)

        let output = super.toJSON()
        output.name = this.name
        output.labels = this.labels

        if (this.description)
            output.description = this.description
        if (this.aliases && this.aliases.length > 0)
            output.aliases = this.aliases
        if (this.roles && this.roles.length > 0)
            output.roles = this.roles
        if (this.goals && this.goals.length > 0)
            output.goals = this.goals
        if (this.sophistication)
            output.sophistication = this.sophistication
        if (this.resourceLevel)
            output.resource_level = this.resourceLevel
        if (this.primaryMotivation)
            output.primary_motivation = this.primaryMotivation
        if (this.secondaryMotivations && this.secondaryMotivations.length > 0)
            output.secondary_motivations = this.secondaryMotivations
        if (this.personalMotivations && this.personalMotivations.length > 0)
            output.personal_motivations = this.personalMotivations

        return output
    }
}

export default ThreatActor