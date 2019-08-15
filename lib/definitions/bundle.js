import { BaseObject } from '../objects/baseObject'

class Bundle {

    type = 'bundle'
    id = null
    specVersion = "2.0"
    objects = []

    constructor() {
        // TODO: Generate ID
    }

    setId(value) {
        this.id = `${this.type}--${value}`
    }

    addObject(object) {
        if (!(object instanceof BaseObject))
            throw Error('You cannot add a non-object to a bundle!')

        this.objects.push(object)
    }

    toJSON() {
        if (!this.type)
            throw Error(`STIX 2.0 requires a type!`)
        if (!this.id)
            throw Error(`STIX 2.0 requires an ID!`)

        // Compile objects as JSON
        let outputObjects = []
        for (let i of this.objects)
            outputObjects.push(i.toJSON())

        return {
            type: this.type,
            id: this.id,
            spec_version: this.specVersion,
            objects: outputObjects
        }
    }
}

export default Bundle