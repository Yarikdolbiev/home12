function DeprecatedMethod(reason: string, replacement?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`${propertyKey}: ${reason}`);
      if (replacement) {
        console.log(` ${replacement} `);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

function MinLength(minLength: number) {
  return function (target: any, propertyKey: string) {
    let value: string;

    const getter = function () {
      return value;
    };

    const setter = function (newValue: string) {
      if (newValue.length < minLength) {
        throw new Error(`${propertyKey} должна иметь ${minLength}`);
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

function MaxLength(maxLength: number) {
  return function (target: any, propertyKey: string) {
    let value: string;

    const getter = function () {
      return value;
    };

    const setter = function (newValue: string) {
      if (newValue.length > maxLength) {
        throw new Error(`${propertyKey} должна иметь ${maxLength}`);
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

function Email(target: any, propertyKey: string) {
  let value: string;

  const getter = function () {
    return value;
  };

  const setter = function (newValue: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(newValue)) {
      throw new Error(`${propertyKey} должен быть действительный адрес электронной почты`);
    }
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}