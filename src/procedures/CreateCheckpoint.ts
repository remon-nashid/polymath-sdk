import { Procedure } from './Procedure';
import { CreateCheckpointProcedureArgs, ProcedureTypes, PolyTransactionTags } from '~/types';

export class CreateCheckpoint extends Procedure<CreateCheckpointProcedureArgs> {
  public type = ProcedureTypes.CreateCheckpoint;
  public async prepareTransactions() {
    const { symbol } = this.args;
    const { securityTokenRegistry } = this.context;

    const securityToken = await securityTokenRegistry.getSecurityToken({
      ticker: symbol,
    });

    const checkpointIndex = await this.addTransaction(
      securityToken.createCheckpoint,
      {
        tag: PolyTransactionTags.CreateCheckpoint,
        // TODO @monitz87: replace this with the correct receipt type when we integrate the SDK with
        // the contract-wrappers package
        resolver: async receipt => {
          const { events } = receipt;

          if (events) {
            const { CheckpointCreated } = events;

            const {
              _checkpointId,
            }: {
              _checkpointId: string;
            } = CheckpointCreated.returnValues;

            return parseInt(_checkpointId, 10);
          }
        },
      }
    )();

    return checkpointIndex;
  }
}
