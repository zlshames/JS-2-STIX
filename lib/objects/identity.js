import { BaseObject } from "./baseObject"
import { IdentityClasses, IndustrySectors } from '../definitions/vocabulary'

class Identity extends BaseObject {

    name = null
    description = null
    identityClass = null
    sectors = []
    contactInformation = null


    constructor(name) {
        super('identity')

        this.name = name
    }

    setIdentityClass(identity) {
        if (Object.values(IdentityClasses).indexOf(identity.toLowerCase()) === -1)
            throw Error(`Invalid identity class! Must be one of the following: ${Array(Object.values(IdentityClasses)).join(', ')}`)

        this.identityClass = identity.toLowerCase()
    }

    addSector(sector) {
        if (Object.values(IndustrySectors).indexOf(sector.toLowerCase()) === -1)
            throw Error(`Invalid identity class! Must be one of the following: ${Array(Object.values(IndustrySectors)).join(', ')}`)

        if (this.sectors.indexOf(sector.toLowerCase()) === -1)
            this.sectors.push(sector.toLowerCase())
    }

    toJSON() {
        if (!this.name)
            throw Error(`STIX 2.0 requires an identity name!`)
        if (!this.identityClass)
            throw Error(`STIX 2.0 requires an identity class!`)

        let output = super.toJSON()
        output.name = this.name
        output.identityClass = this.identityClass

        if (this.description)
            output.description = this.description
        if (this.sectors && this.sectors.length > 0)
            output.sectors = this.sectors
        if (this.contactInformation)
            output.contact_information = this.contactInformation

        return output
    }
}

export default Identity