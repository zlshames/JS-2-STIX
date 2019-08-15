import { BaseObject } from "./baseObject"

class ObservedData extends BaseObject {

    firstObserved = null
    lastObserved = null
    numberObserved = null
    objects = []
    
    constructor() {
        super('observed-data')
    }

    setNumberObserved(num) {
        if (!(num instanceof Number))
            throw Error('Number Observed must be an integer!')

        if (num < 1 || num > 999999999)
            throw Error('Number Observed must be within 1 and 999,999,999!')

        this.numberObserved = num
    }

    addObject(object) {
        // TODO: Set this to Observable Object
        if (!(phase instanceof KillChainPhase))
            throw Error('You can only add an object of the ObservableObject type!')
            
        this.objects.push(object)
    }

    toJSON() {
        if (!this.firstObserved)
            throw Error(`STIX 2.0 requires a first observed timestamp!`)
        if (!this.lastObserved)
            throw Error(`STIX 2.0 requires a last observed timestamp!`)
        if (!this.numberObserved)
            throw Error(`STIX 2.0 requires a number of times the data was observed!`)
        if (!this.objects || this.objects.length === 0)
            throw Error(`STIX 2.0 requires at least 1 object in the observed data!`)

        let output = super.toJSON()
        output.first_observed = this.firstObserved
        output.last_observed = this.lastObserved
        output.number_observed = this.numberObserved

        let objects = []
        for (let i of this.objects)
            objects.push(i.toJSON())
        output.objects = objects

        return output
    }
}

export default ObservedData