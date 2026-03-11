import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_HYGRAPH_URL || '';

export const hygraphClient = new GraphQLClient(API_URL);
