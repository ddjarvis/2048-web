function reactiveValue(initialValue) {
    let value = initialValue;
    const subscribers = [];

    function get() {
        return value;
    }

    function set(newValue) {
        if (value !== newValue) {
            value = newValue;
            subscribers.forEach((subscriber) => subscriber());
        }
    }

    function subscribe(subscriber) {
      subscribers.push(subscriber);
    }

    return { get, set, subscribe };
}

function bindReactiveElements(ReactiveStore = {}, label = 'reactive') {
    const reactiveElements = document.querySelectorAll(`[data-${label}]`);

    reactiveElements.forEach((element) => {
        const name = element.dataset[label];
        if (!ReactiveStore[name]) {
            ReactiveStore[name] = reactiveValue('');
        }
        const value = ReactiveStore[name];

        // Set up a subscription to update the element when the value changes
        value.subscribe(() => {
            element.textContent = value.get();
        });

        // Update the value when the element changes
        element.addEventListener('input', (event) => {
            value.set(event.target.value);
        });
    });
}

function reactiveExpression(fn, ...values) {
    const result = fn(...values.map((value) => value.get()));
    const dependencies = values.filter((value) => value instanceof ReactiveValue);

    const reactiveValue = reactiveValue(result);

    dependencies.forEach((dependency) => {
        dependency.subscribe(() => {
            reactiveValue.set(fn(...dependencies.map((value) => value.get())));
        });
    });

    return reactiveValue;
}