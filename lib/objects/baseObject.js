// import { Identity } from './identity'
import { ExternalReference } from './externalReference'

export class BaseObject {

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

    setId(value) {
        this.id = `${this.type}--${value}`
    }

    setCreatedByRef(value) {
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
        if (this.labels && this.labels.length > 0)
            output.labels = this.labels
        if (this.objectMarkingRefs && this.objectMarkingRefs.length > 0)
            output.object_marking_refs = this.objectMarkingRefs

        if (this.granularMarkings && this.granularMarkings.length > 0) {
            let granularMarkings = []
            for (let i of this.granularMarkings)
                granularMarkings.push(i.toJSON())
            output.granular_markings = granularMarkings
        }

        if (this.externalReferences && this.externalReferences.length > 0) {
            let externalRefs = []
            for (let i of this.externalReferences)
                externalRefs.push(i.toJSON())
            output.external_references = externalRefs
        }

        return output
    }
}