import { DefinitionTypes, TLPs } from '../constants/general'
import GranularMarking from './granularMarking'
import Identity from '../objects/identity'

class Marking {

    type = 'marking-definition'
    id = null
    createdByRef = null
    created = null
    externalReferences = []
    objectMarkingRefs = []
    granularMarkings = []
    definitionType = null
    definition = {}

    constructor(defType) {
        // TODO: Generate ID
        this.definitionType = defType
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

    set definitionType(defType) {
        if (Object.values(DefinitionTypes).indexOf(defType.toLowerCase()) === -1)
            throw Error(`Invalid definition type! Must be one of the following: ${Array(Object.values(DefinitionTypes)).join(', ')}`)

        this.definitionType = defType.toLowerCase()
    }

    addObjectMarkingRef(marking) {
        if (marking instanceof Marking) {
            this.objectMarkingRefs.push(marking.id)
        } else {
            this.objectMarkingRefs.push(marking)
        }
    }

    setTLP(tlp) {
        if (this.definitionType !== DefinitionTypes.TLP)
            throw Error('The definition Must be "TLP" in order to set the TLP')
        if (Object.values(TLPs).indexOf(tlp.toLowerCase()) === -1)
            throw Error(`Invalid TLP! Must be one of the following: ${Array(Object.values(TLPs)).join(', ')}`)

        this.definition = {
            tlp: tlp
        }
    }

    setStatement(statement) {
        if (this.definitionType !== DefinitionTypes.STATEMENT)
            throw Error('The definition Must be "statement" in order to set the statement')

        this.definition = {
            statement: statement
        }
    }

    addGranularMarking(marking) {
        if (!(marking instanceof GranularMarking))
            throw Error('You must add an object of the GranularMarking type!')
        
        this.granularMarkings.push(marking)
    }

    toJSON() {
        if (!this.type)
            throw Error(`STIX 2.0 requires a marking type!`)
        if (!this.id)
            throw Error(`STIX 2.0 requires a marking ID!`)
        if (!this.created)
            throw Error(`STIX 2.0 requires a creation timestimp!`)
        if (!this.definitionType)
            throw Error(`STIX 2.0 requires a definition type!`)
        if (!this.definition)
            throw Error(`STIX 2.0 requires a marking definition!`)

        let output = {
            type: this.type,
            id: this.id,
            created: this.created,
            definitionType: this.definitionType,
            definition: this.definition
        }

        // Compile granular markings as JSON
        let granularMarkings = []
        for (let i in this.granularMarkings)
            granularMarkings.push(i.toJSON())

        if (this.createdByRef)
            output.createdByRef = this.createdByRef
        if (this.externalReferences)
            output.externalReferences = this.externalReferences
        if (this.granularMarkings)
            output.granularMarkings = granularMarkings

        return output
    }
}