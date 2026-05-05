import { NotFoundException } from '@nestjs/common'
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

    public async update(bankAccount: BankAccount): Promise<void> {
        await this.ormRepo.update(bankAccount.id, {
            balance: bankAccount.balance,
            accountNumber: bankAccount.accountNumber,
        })
    }

    public async findByAccountNumber(
        accountNumber: string,
    ): Promise<BankAccount> {
        const model = await this.ormRepo.findOneBy({ accountNumber })

        if (!model) {
            throw new NotFoundException(
                `Bank account not found by the account number ${accountNumber}`,
            )
        }

        return new BankAccount(model.balance, model.accountNumber, model.id)
    }
}
