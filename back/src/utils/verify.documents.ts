export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, ''); 

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  const calculateDigit = (cpf: string, factor: number): number => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i], 10) * (factor - i);
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cpf, 10);
  const secondDigit = calculateDigit(cpf, 11);

  return (
    firstDigit === parseInt(cpf[9], 10) &&
    secondDigit === parseInt(cpf[10], 10)
  );
}

  
  export function isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]/g, '');
  
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return false;
    }
  
    const calculateDigit = (cnpj: string, weights: number[]): number => {
      let total = 0;
      for (let i = 0; i < weights.length; i++) {
        total += parseInt(cnpj[i]) * weights[i];
      }
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
    const firstDigit = calculateDigit(cnpj, firstWeights);
    const secondDigit = calculateDigit(cnpj, secondWeights);
  
    return (
      firstDigit === parseInt(cnpj[12]) &&
      secondDigit === parseInt(cnpj[13])
    );
  }
  