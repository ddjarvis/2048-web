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
  const getElemsWithReactiveAttribs = (label) => {
    const prefix = `data-${label}-`;
    const allElems = document.querySelectorAll('*');
    const matchedElems = [...allElems].filter(el => [...el.attributes].some(attr => attr.name.startsWith(prefix)));
    return matchedElems;
  };
  const toProperCase = (word) => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  }
  const datasetCase = (attr, prefix) => {
    const datasetName = (typeof attr == 'string' ? attr : attr.name).replace(prefix,'');
    const pascalCase = datasetName.split('-').map(w => toProperCase(w)).join('');
    const camelCase = pascalCase.replace(/^[A-Z]/, match => match.toLowerCase());
    return { pascalCase, camelCase };
  }
  
  const reactiveElements = document.querySelectorAll(`[data-${label}]`);
  const reactiveElementAttributes = getElemsWithReactiveAttribs(label);
  
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

  reactiveElementAttributes.forEach(el => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        const prefix = `data-${label}-`;
        // console.log('Mutation:');
        // console.log(mutation);
        // console.log(`mutation.type = ${mutation.type}`);
        if (mutation.type === 'attributes' && mutation.attributeName.startsWith(prefix)) {
          const reactiveTarget = `${datasetCase(mutation.attributeName,prefix).camelCase}`;
          const dataset = `${label}${datasetCase(mutation.attributeName,prefix).pascalCase}`;
          const datasetValue = mutation.target.dataset[dataset];
          console.log('matched:', mutation.attributeName);
          console.log('dataset:', dataset);
          console.log('value:', datasetValue);
          if(!ReactiveStore[reactiveTarget]) {
            ReactiveStore[reactiveTarget] = reactiveValue('');
          }
          const data = ReactiveStore[reactiveTarget];
          data.value = datasetValue;
        }
      }
    });
    const prefix = `data-${label}-`;
    const reactiveAttribs = [...el.attributes].filter(attr => attr.name.startsWith(prefix));

    reactiveAttribs.forEach(attr => {
      const dataset = `${label}${datasetCase(attr, prefix).pascalCase}`;
      const target = datasetCase(attr, prefix).camelCase;
      
      if(!ReactiveStore[target]) {
        ReactiveStore[target] = reactiveValue('');
      }
      
      const data = ReactiveStore[target];

      attr.value = data.value;

      data.subscribe(() => {
          el.dataset[dataset] = data.value;
      });
    });

    observer.observe(el, {attributes: true});
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