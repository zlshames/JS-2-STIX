import BaseObject from "./baseObject"

class Campaign extends BaseObject {

    name = null
    description = null
    aliases = []
    firstSeen = null
    lastSeen = null
    objective = null

    
    constructor(name) {
        super('campaign')

        this.name = name
    }

    addAlias(alias) {
        if (this.aliases.indexOf(alias) === -1)
            this.aliases.push(alias)
    }

    toJSON() {
        if (!this.name)
            throw Error(`STIX 2.0 requires a campaign name!`)

        let output = super.toJSON()
        output.name = name

        if (this.description)
            output.description = this.description
        if (this.aliases)
            output.aliases = this.aliases
        if (this.firstSeen)
            output.first_seen = this.aliases
        if (this.lastSeen)
            output.last_seen = this.lastSeen
        if (this.objective)
            output.objective = this.objective

        return output
    }
}

export default Campaign