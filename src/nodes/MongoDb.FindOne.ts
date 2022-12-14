import { MongoFilter, MongoProjection } from '@nodescript/adapter-mongodb-protocol';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { requireConnection } from '../lib/MongoDbConnection.js';

type P = {
    connection: unknown;
    collection: string;
    filter: MongoFilter;
    projection: MongoProjection;
};
type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@contrib/MongoDb.FindOne',
    version: '1.0.0',
    label: 'MongoDB Find One',
    description: 'Finds one document in specified MongoDB collection.',
    keywords: ['mongodb', 'database', 'find', 'query'],
    params: {
        connection: {
            schema: { type: 'any' },
            hideValue: true,
        },
        collection: {
            schema: { type: 'string' },
        },
        filter: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'any' },
            },
        },
        projection: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'any' },
            }
        }
    },
    result: {
        async: true,
        schema: { type: 'any' },
    },
    evalMode: 'manual',
    cacheMode: 'always',
};

export const compute: ModuleCompute<P, R> = async params => {
    const connection = requireConnection(params.connection);
    const collection = params.collection;
    const filter = params.filter;
    const projection = Object.keys(params.projection).length > 0 ? params.projection : undefined;
    const { document } = await connection.Mongo.findOne({
        collection,
        filter,
        projection,
    });
    return document;
};
