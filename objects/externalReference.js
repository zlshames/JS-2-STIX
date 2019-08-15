class ExternalReference {

    id = null
    externalId = null
    sourceName = null
    
    constructor(sourceName) {
        this.sourceName = sourceName
    }

    toJSON() {
        let output = { sourceName: this.sourceName }
        if (!this.externalId && !this.id)
            throw Error('An external reference must have either an ID or an External ID!')

        if (this.externalId)
            output.external_id = this.externalId
        if (this.id)
            output.id = this.id

        return output
    }
}

export default ExternalReference