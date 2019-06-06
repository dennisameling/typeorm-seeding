import * as Faker from 'faker'
import { Connection, ObjectType } from 'typeorm'

import { EntityFactory } from './entity-factory'

/**
 * FactoryFunction is the fucntion, which generate a new filled entity
 */
export type FactoryFunction<Entity, Settings> = (faker: typeof Faker, settings?: Settings) => Entity

/**
 * EntityProperty defines an object whose keys and values must be properties of the given Entity.
 */
export type EntityProperty<Entity> = { [Property in keyof Entity]?: Entity[Property] }

/**
 * Factory gets the EntityFactory to the given Entity and pass the settings along
 */
export type Factory = <Entity, Settings>(
  entity: ObjectType<Entity>,
) => (settings?: Settings) => EntityFactory<Entity, Settings>

/**
 * Seed are the class to create some data. Those seed are run by the cli.
 */
export interface Seeder {
  run(factory: Factory, connection: Connection): Promise<void>
}

/**
 * Constructor of the seed class
 */
export type SeederConstructor = new () => Seeder

/**
 * Value of our EntityFactory state
 */
export interface EntityFactoryDefinition<Entity, Settings> {
  entity: ObjectType<Entity>
  factory: FactoryFunction<Entity, Settings>
}
