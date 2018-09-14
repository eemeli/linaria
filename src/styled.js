const React = require('react'); // eslint-disable-line import/no-extraneous-dependencies

function styled() {
  throw new Error(
    'Using the "styled" tag in runtime is not supported. Make sure you have set up the Babel plugin correctly.'
  );
}

styled.component = (tag, options) => {
  const Result = function Result(props) {
    const next = Object.assign({}, props, {
      className: props.className
        ? `${options.class} ${props.className}`
        : options.class,
    });

    if (options.vars) {
      const style = {};

      Object.keys(options.vars).forEach(name => {
        const value = options.vars[name];
        style[`--${name}`] = typeof value === 'function' ? value(props) : value;
      });

      next.style = Object.assign(style, next.style);
    }

    return React.createElement(tag, next);
  };

  Result.displayName = options.name;
  Result.className = options.class;

  return Result;
};

module.exports = styled;