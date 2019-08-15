import { Bundle, ThreatActor, Identity, Relationship, Vocabulary } from '../index'

/**
 * This example is based on the Oasis CTI Example for "Identifying a threat actor profile"
 * 
 * Link: https://oasis-open.github.io/cti-documentation/examples/identifying-a-threat-actor-profile
 */

const bundle = new Bundle()
bundle.id = 'bundle--c9567f73-3803-415c-b06e-2b0622830e5d'

// Create the actor profile
const actor = new ThreatActor('Disco Team Threat Actor Group')
actor.id = 'threat-actor--dfaa8d77-07e2-4e28-b2c8-92e9f7b04428'
actor.created = '2014-11-19T23:39:03.893Z'
actor.modified = '2014-11-19T23:39:03.893Z'
actor.description = 'This organized threat actor group operates to create profit from all types of crime.'
actor.addLabel(Vocabulary.ThreatActorLabels.CRIME_SYNDICATE)
actor.addAlias('Equipo del Discoteca')
actor.addRole(Vocabulary.ThreatActorRoles.AGENT)
actor.addGoal('Steal Credit Card information')
actor.sophistication = Vocabulary.ThreatActorSophistications.EXPERT
actor.resourceLevel = Vocabulary.AttackResourceLevels.ORGANIZATION
actor.primaryMotivation = Vocabulary.AttackMotivations.PERSONAL_GAIN

// Create the identity profile
const identity = new Identity('Disco Team')
identity.id = 'identity--733c5838-34d9-4fbf-949c-62aba761184c'
identity.created = '2016-08-23T18:05:49.307Z'
identity.modified = '2016-08-23T18:05:49.307Z'
identity.description = 'Disco Team is the name of an organized threat actor crime-syndicate.'
identity.identityClass = Vocabulary.IdentityClasses.ORGANIZATION,
identity.contactInformation = 'disco-team@stealthmail.com'

// Add the relationship
const relationship = new Relationship(Vocabulary.RelationshipTypes.ATTRIBUTED_TO)
relationship.id = 'relationship--966c5838-34d9-4fbf-949c-62aba7611837'
relationship.created = '2016-08-23T18:05:49.307Z'
relationship.modified = '2016-08-23T18:05:49.307Z'
relationship.setSourceRef(actor)
relationship.setTargetRef(identity)

// Add to bundle
bundle.addObject(actor)
bundle.addObject(identity)
bundle.addObject(relationship)

// Print out JSON
console.log(JSON.stringify(bundle.toJSON(), null, 4))
