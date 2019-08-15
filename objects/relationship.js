import BaseObject from "./baseObject"

class Relationship extends BaseObject {

    relationshipType = null
    description = null
    sourceRef = null
    targetRef = null
    
    constructor(relationshipType) {
        super('relationship')

        this.relationshipType = relationshipType
    }

    toJSON() {
        if (!this.relationshipType)
            throw Error(`STIX 2.0 requires a relationship type!`)
        if (!this.sourceRef)
            throw Error(`STIX 2.0 requires a source reference!`)
        if (!this.targetRef)
            throw Error(`STIX 2.0 requires a target reference!`)

        let output = super.toJSON()
        output.relationshipType = this.relationshipType
        output.sourceRef = this.sourceRef
        output.targetRef = this.targetRef

        if (this.description)
            output.description = this.description

        return output
    }
}

export default Relationship