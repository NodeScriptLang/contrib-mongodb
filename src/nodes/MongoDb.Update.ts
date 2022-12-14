import { MongoFilter, MongoUpdate } from '@nodescript/adapter-mongodb-protocol';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { requireConnection } from '../lib/MongoDbConnection.js';

type P = {
    connection: unknown;
    collection: string;
    filter: MongoFilter;
    update: MongoUpdate;
    multiple: boolean;
    upsert: boolean;
};
type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@contrib/MongoDb.Update',
    version: '1.0.0',
    label: 'MongoDB Update One',
    description: 'Updates documents matching criteria in specified MongoDB collection.',
    keywords: ['mongodb', 'database', 'update'],
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
        update: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'any' },
            },
        },
        multiple: {
            schema: { type: 'boolean' },
        },
        upsert: {
            schema: { type: 'boolean' },
        },
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
    const update = params.update;
    const upsert = params.upsert;
    if (params.multiple) {
        return await connection.Mongo.updateMany({
            collection,
            filter,
            update,
        });
    }
    return await connection.Mongo.updateOne({
        collection,
        filter,
        update,
        upsert,
    });
};
