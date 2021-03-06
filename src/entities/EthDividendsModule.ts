import { Polymath } from '~/Polymath';
import { serialize } from '~/utils';
import { DividendsModule, Params, UniqueIdentifiers } from './DividendsModule';
import { DividendModuleTypes, Omit } from '~/types';

export class EthDividendsModule extends DividendsModule {
  public static generateId({
    securityTokenSymbol,
    dividendType,
  }: UniqueIdentifiers) {
    return serialize('ethDividendsModule', {
      securityTokenSymbol,
      dividendType,
    });
  }

  public uid: string;

  constructor(
    {
      securityTokenSymbol,
      securityTokenId,
      address,
      storageWalletAddress,
    }: Omit<Params, 'dividendType'>,
    polyClient?: Polymath
  ) {
    const dividendType = DividendModuleTypes.Eth;
    super(
      {
        securityTokenId,
        securityTokenSymbol,
        dividendType,
        address,
        storageWalletAddress,
      },
      polyClient
    );

    this.uid = EthDividendsModule.generateId({
      securityTokenSymbol,
      dividendType,
    });
  }
}
