import { BankAccount } from 'src/@core/domain/bank-account'
import { BankAccountRepository } from 'src/@core/domain/bank-account.repository'
import { BankAccountSchema } from 'src/@core/infra/db/bank-account.schema'
import { Repository } from 'typeorm'

export class BankAccountTypeOrmRepository implements BankAccountRepository {
    public constructor(
        private readonly ormRepo: Repository<BankAccountSchema>,
    ) {}

    public async insert(bankAccount: BankAccount): Promise<BankAccount> {
        const model = this.ormRepo.create(bankAccount)
        await this.ormRepo.save(model)
        return bankAccount
    }
}
