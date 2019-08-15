import Identity from './identity'
import ExternalReference from './externalReference'

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

    addExternalReference(ref) {
        if (!(ref instanceof ExternalReference))
            throw Error('You can only add an external reference of the ExternalReference type!')
            
        this.externalReferences.push(ref)
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
        if (this.objectMarkingRefs)
            output.object_marking_refs = this.objectMarkingRefs

        let granularMarkings = []
        for (let i in this.granularMarkings)
            granularMarkings.push(i.toJSON())
        if (granularMarkings)
            output.granular_markings = granularMarkings

        let externalRefs = []
        for (let i in this.externalReferences)
            externalRefs.push(i.toJSON())
        if (externalRefs)
            output.external_references = externalRefs

        return output
    }
}

export default BaseObject