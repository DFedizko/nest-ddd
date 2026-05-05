import { Repository, DataSource } from 'typeorm'
import type { BankAccountRepository } from './bank-account.repository'
import { BankAccountSchema } from '../infra/db/bank-account.schema'
import { BankAccountTypeOrmRepository } from '../infra/db/bank-account-typeorm.repository'
import { BankAccountService } from './bank-account.service'
import { BankAccount } from './bank-account'

describe('BankAccountService Test', () => {
    let dataSource: DataSource
    let ormRepo: Repository<BankAccountSchema>
    let repository: BankAccountRepository
    let bankAccountService: BankAccountService

    beforeEach(async () => {
        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [BankAccountSchema],
        })
        await dataSource.initialize()
        ormRepo = dataSource.getRepository(BankAccountSchema)
        repository = new BankAccountTypeOrmRepository(ormRepo)
        bankAccountService = new BankAccountService(repository)
    })

    it('should create a new bank account', async () => {
        const bankAccount = await bankAccountService.create('1111-11')
        const bankAccountFound = await ormRepo.findOneBy({
            accountNumber: '1111-11',
        })

        console.log(bankAccount.id)
        console.log(bankAccountFound?.id)

        expect(bankAccountFound?.id).toBe(bankAccount.id)
        expect(bankAccount.balance).toBe(bankAccount.balance)
        expect(bankAccountFound?.accountNumber).toBe(bankAccount.accountNumber)
    })

    it('should transfer an amount of money from one bank account to another', async () => {
        const sourceBankAccount = new BankAccount(1000, '1111-11', '1')
        const destinyBankAccount = new BankAccount(1000, '1111-12', '2')
        const amountToTransfer = 500

        await repository.insert(sourceBankAccount)
        await repository.insert(destinyBankAccount)

        const foundSourceBankAccount =
            await repository.findByAccountNumber('1111-11')
        const foundDestinyBankAccount =
            await repository.findByAccountNumber('1111-12')

        await bankAccountService.transfer({
            accountNumberSource: foundSourceBankAccount.accountNumber,
            accountNumberDestiny: foundDestinyBankAccount.accountNumber,
            amount: amountToTransfer,
        })

        const sourceBankAccountAfterTransfer =
            await repository.findByAccountNumber('1111-11')
        const destinyBankAccountAfterTransfer =
            await repository.findByAccountNumber('1111-12')

        expect(sourceBankAccountAfterTransfer.balance).toBe(500)
        expect(destinyBankAccountAfterTransfer.balance).toBe(1500)
    })
})
