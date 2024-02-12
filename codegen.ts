import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/graphql` as string,
  documents: 'src/lib/gql/*.drupal.gql',
  generates: {
    'src/lib/gql/__generated__/drupal.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request']
    }
  },
};

export default config;