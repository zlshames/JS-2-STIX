import { BaseObject } from "./baseObject"

class CourseOfAction extends BaseObject {

    name = null
    description = null
    action = null

    
    constructor(name) {
        super('course-of-action')

        this.name = name
    }

    toJSON() {
        if (!this.name)
            throw Error(`STIX 2.0 requires a course of action name!`)

        let output = super.toJSON()
        output.name = this.name

        if (this.description)
            output.description = this.description

        // Yes, we are ignoring action for now

        return output
    }
}

export default CourseOfAction