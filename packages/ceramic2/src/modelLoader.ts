import { CeramicSchemas } from '@circlesland/interfaces-ceramic/src/Schemas';

export default function modelLoader(schema: CeramicSchemas) {
  switch (schema) {
    case CeramicSchemas.basicProfile: {
      return {
        schemas: {
          basicProfile: "ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio",
        },
        definitions: {
          BasicProfile: "kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic",
        },
        tiles: {},
      };
    }

    default: {
      return {
        schemas: {
          basicProfile: "ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio",
        },
        definitions: {
          BasicProfile: "kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic",
        },
        tiles: {},
      };
    }
  }
}
