import { Repository, DataSource } from 'typeorm'
import type { BankAccountRepository } from './bank-account.repository'
import { BankAccountSchema } from '../infra/db/bank-account.schema'
import { BankAccountTypeOrmRepository } from '../infra/db/bank-account-typeorm.repository'
import { BankAccountService } from './bank-account.service'

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
        expect(bankAccountFound?.id).toBe(bankAccount.id)
        expect(bankAccount.balance).toBe(bankAccount.balance)
        expect(bankAccountFound?.accountNumber).toBe(bankAccount.accountNumber)
    })
})
