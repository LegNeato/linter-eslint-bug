module.exports = {
  meta: {
    docs: {
      description: 'disallow the use of `process.env.NODE_ENV`',
      recommended: false,
    },
    schema: [],
  },

  create: context => {
    return {
      MemberExpression: node => {
        const objectName = node.object.name;
        const propertyName = node.property.name;
        const parent = node.parent;

        if (
          objectName === 'process' &&
          !node.computed &&
          propertyName &&
          propertyName === 'env'
        ) {
          if (
            parent &&
            parent.property &&
            parent.property.name === 'NODE_ENV'
          ) {
            /* eslint-disable */
            context.report(
              node,
              'Unexpected use of process.env.NODE_ENV. Use `typedNodeEnv()` instead.',
            );
            /* eslint-enable */
          }
        }
      },
    };
  },
};
