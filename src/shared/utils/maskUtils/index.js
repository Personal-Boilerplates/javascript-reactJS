import cpf from './regex/_handleCpfRegex';
import cnpj from './regex/_handleCnpjRegex';
import phone from './regex/_handlePhoneRegex';
import cep from './regex/_handleCepRegex';
import onlyNumbers from './regex/_handleOnlyNumberRegex';

export default {
  cpf,
  cnpj,
  phone,
  cep,
  onlyNumbers,
};

export { default as cpfMask } from './regex/_handleCpfRegex';
export { default as cnpjMask } from './regex/_handleCnpjRegex';
export { default as phoneMask } from './regex/_handlePhoneRegex';
export { default as cepMask } from './regex/_handleCepRegex';
export { default as onlyNumberMask } from './regex/_handleOnlyNumberRegex';
