import Identity from './identity'

class BaseObject {

    type = null
    id = null
    createdByRef = null
    created = null
    modified = null
    revoked = null
    labels = []
    externalReferences = []
    objectMarkingRefs = []
    granularMarkings = []

    constructor(type) {
        this.type = type
    }

    set id(value) {
        this.id = `${this.type}--${value}`
    }

    set createdByRef(value) {
        if (value instanceof Identity) {
            this.createdByRef = value.id
        } else {
            this.createdByRef = value
        }
    }

    toJSON() {
        if (!this.type)
            throw Error(`STIX 2.0 requires an object type!`)
        if (!this.id)
            throw Error(`STIX 2.0 requires an object ID!`)
        if (!this.created)
            throw Error(`STIX 2.0 requires a created timestamp!`)
        if (!this.modified)
            throw Error(`STIX 2.0 requires a modified timestamp!`)

        let output = {
            type: this.type,
            id: this.id,
            created: this.created,
            modified: this.modified
        }

        if (this.createdByRef)
            output.created_by_ref = this.createdByRef
        if (this.revoked)
            output.revoked = this.revoked
        if (this.labels)
            output.labels = this.labels
        if (this.externalReferences)
            output.external_references = this.externalReferences
        if (this.objectMarkingRefs)
            output.object_marking_refs = this.objectMarkingRefs
        if (this.granular_markings)
            output.granular_markings = this.granularMarkings

        return output
    }
}

export default BaseObject