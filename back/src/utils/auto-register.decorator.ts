import { container, injectable, inject } from 'tsyringe';

function AutoRegister() {
  return function (target: any) {
    injectable()(target);
    container.register(target, { useClass: target });
  };
}

export { AutoRegister, inject };
