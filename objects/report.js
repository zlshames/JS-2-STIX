import BaseObject from "./baseObject"
import { ReportLabels } from '../constants/vocabulary'

class Report extends BaseObject {

    name = null
    description = null
    published = null
    objectRefs = []
    
    constructor(name) {
        super('report')

        this.name = name
    }

    addObjectRef(ref) {
        if (ref.indexOf('--') === -1)
            throw Error('Invalid object identifier!')

        this.objectRefs.push(ref)
    }

    addLabel(label) {
        if (Object.values(ReportLabels).indexOf(label.toLowerCase()) === -1)
            throw Error(`Invalid report label! Must be one of the following: ${Array(Object.values(ReportLabels)).join(', ')}`)

        this.labels.append(label.toLowerCase())
    }

    toJSON() {
        if (!this.labels)
            throw Error(`STIX 2.0 requires report labels!`)
        if (!this.name)
            throw Error(`STIX 2.0 requires a report name!`)
        if (!this.published)
            throw Error(`STIX 2.0 requires a published timestamp!`)
        if (!this.objectRefs)
            throw Error(`STIX 2.0 requires at least 1 object reference!`)

        let output = super.toJSON()
        output.name = this.name
        output.published = this.published
        output.object_refs = this.objectRefs

        if (this.description)
            output.description = this.description
        if (this.labels)
            output.labels = labels

        return output
    }
}

export default Report