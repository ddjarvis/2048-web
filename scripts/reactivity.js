function reactiveValue(initialValue) {
  let value = initialValue;
  const subscribers = [];

  const handler = {
    get(target, prop) {
      if (prop === 'subscribe') {
        return (subscriber) => subscribers.push(subscriber);
      }
      if (prop === 'value') {
        return value;
      }
      return Reflect.get(target, prop);
    },
    set(target, prop, newValue) {
      if (prop === 'value') {
        if (value !== newValue) {
          value = newValue;
          subscribers.forEach((subscriber) => subscriber(value));
        }
        return true;
      }
      return Reflect.set(target, prop, newValue);
    }
  };

  return new Proxy({}, handler);
}


function bindReactiveElements(ReactiveStore = {}, label = 'reactive') {
    const reactiveElements = document.querySelectorAll(`[data-${label}]`);

    reactiveElements.forEach((element) => {
        const name = element.dataset[label];
        if (!ReactiveStore[name]) {
            ReactiveStore[name] = reactiveValue('');
        }
        const data = ReactiveStore[name];

        // Set up a subscription to update the element when the value changes
        data.subscribe(() => {
            element.innerText = data.value;
        });

        // Update the value when the element changes
        element.addEventListener('input', (event) => {
            data.value = (event.target.value);
        });
    });
}

/*
function reactiveExpression(fn, ...values) {
    const result = fn(...values.map((data) => data.value));
    const dependencies = values.filter((data) => data instanceof ReactiveValue);

    const reactiveValue = reactiveValue(result);

    dependencies.forEach((dependency) => {
        dependency.subscribe(() => {
            reactiveValue.set(fn(...dependencies.map((data) => data.value)));
        });
    });

    return reactiveValue;
}
    */
   function reactiveExpression(fn, ...values) {
    // Compute initial result
    const result = fn(...values.map((data) => data.value));

    // Create a new reactive value to hold the result
    const rv = reactiveValue(result);

    // Subscribe to each dependency
    values.forEach((dependency) => {
        dependency.subscribe(() => {
            rv.value = fn(...values.map((data) => data.value));
        });
    });

    return rv;
}