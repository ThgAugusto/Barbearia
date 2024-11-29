export function getChangedValues<T extends object>(
    formValues: T, 
    initialValues: T, 
    protectedKeys: (keyof T)[] = [] 
  ): Partial<T> {
    const changedValues: Partial<T> = {};
  
    Object.keys(formValues).forEach((key) => {
      const typedKey = key as keyof T;
  
      if (protectedKeys.includes(typedKey)) {
        changedValues[typedKey] = formValues[typedKey];
        return; 
      }
  
      if (formValues[typedKey] !== initialValues[typedKey]) {
        changedValues[typedKey] = formValues[typedKey];
      }
    });
  
    return changedValues;
  }
  