import React from 'react';
import ReactDOM from 'react-dom';
import { TypelessContext, Registry } from 'typeless';
import { createModule, useActions } from 'typeless';
import * as Rx from 'typeless/rx';

const registry = new Registry();

const [handle, FooActions] = createModule(Symbol('Foo')).withActions({
  $mounted: null,
  $unmounting: null,
  showFoo: null,
});

handle.epic().on(FooActions.showFoo, () => {
  console.log('bar');
  return Rx.empty();
});

const A = () => {
  handle();
  return <div>this is A</div>;
};
const B = () => {
  handle();
  return <div>B!!!!</div>;
};
const App: React.FC = () => {
  const [bool, toggleState] = React.useState(true);
  const { showFoo } = useActions(FooActions);

  return (
    <div>
      <div>{bool ? <A /> : <B />}</div>
      <div>
        <button onClick={() => toggleState(!bool)}>toggle state</button>
        <button onClick={showFoo}>show foo</button>
      </div>
    </div>
  );
};

ReactDOM.render(
  <TypelessContext.Provider value={{ registry }}>
    <App />
  </TypelessContext.Provider>,
  document.getElementById('root'),
);
