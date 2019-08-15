import BaseObject from "./baseObject"

class Vulnerability extends BaseObject {

    name = null
    description = null
    
    constructor(name) {
        super('vulnerability')

        this.name = name
    }

    toJSON() {
        if (!this.name)
            throw Error(`STIX 2.0 requires a vulnerability name!`)

        let output = super.toJSON()
        output.name = this.name

        if (this.description)
            output.description = this.description

        return output
    }
}

export default Vulnerability