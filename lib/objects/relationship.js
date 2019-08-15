import { BaseObject } from "./baseObject"

class Relationship extends BaseObject {

    relationshipType = null
    description = null
    sourceRef = null
    targetRef = null
    
    constructor(relationshipType) {
        super('relationship')

        this.targetRef = null
        this.relationshipType = relationshipType
    }

    setSourceRef(ref) {
        if (ref instanceof BaseObject)
            this.sourceRef = ref.id
        else
            this.sourceRef = ref
    }

    setTargetRef(ref) {
        if (ref instanceof BaseObject)
            this.targetRef = ref.id
        else
            this.targetRef = ref
    }

    toJSON() {
        if (!this.relationshipType)
            throw Error(`STIX 2.0 requires a relationship type!`)
        if (!this.sourceRef)
            throw Error(`STIX 2.0 requires a source reference!`)
        if (!this.targetRef)
            throw Error(`STIX 2.0 requires a target reference!`)

        let output = super.toJSON()
        output.relationship_type = this.relationshipType
        output.source_ref = this.sourceRef
        output.target_ref = this.targetRef

        if (this.description)
            output.description = this.description

        return output
    }
}

export default Relationship