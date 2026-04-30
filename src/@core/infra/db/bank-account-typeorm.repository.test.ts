import type { BankAccountRepository } from 'src/@core/domain/bank-account.repository'
import { BankAccountSchema } from 'src/@core/infra/db/bank-account.schema'
import { DataSource, Repository } from 'typeorm'
import { BankAccountTypeOrmRepository } from './bank-account-typeorm.repository'
import { BankAccount } from 'src/@core/domain/bank-account'

describe('BankAccountSchema Test', () => {
    let dataSource: DataSource
    let ormRepo: Repository<BankAccountSchema>
    let repository: BankAccountRepository

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
    })

    it('should insert a new bank account', async () => {
        const bankAccount = new BankAccount('123', 100, '1111-11')
        await repository.insert(bankAccount)
        const bankAccountFound = await ormRepo.findOneBy({
            accountNumber: '1111-11',
        })
        expect(bankAccountFound?.id).toBe('123')
        expect(bankAccountFound?.balance).toBe(100)
        expect(bankAccountFound?.accountNumber).toBe('1111-11')
    })
})
