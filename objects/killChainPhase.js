class KillChainPhase {

    killChainName = null
    phaseName = null
    
    constructor(killChain, phase) {
        this.killChainName = killChain
        this.phaseName = phase
    }

    toJSON() {
        return {
            kill_chain_name: this.killChainName,
            phase_name: this.phaseName
        }
    }
}

export default KillChainPhase