import { Module } from '@nestjs/common'
import { getDataSourceToken } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { BankAccountsController } from './bank-accounts.controller'
import { BankAccountService } from 'src/@core/domain/bank-account.service'
import { BankAccountSchema } from 'src/@core/infra/db/bank-account.schema'
import type { BankAccountRepository } from 'src/@core/domain/bank-account.repository'
import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/bank-account-typeorm.repository'

@Module({
    controllers: [BankAccountsController],
    providers: [
        {
            provide: BankAccountTypeOrmRepository,
            useFactory: (dataSource: DataSource) => {
                return new BankAccountTypeOrmRepository(
                    dataSource.getRepository(BankAccountSchema),
                )
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            inject: [getDataSourceToken()],
        },
        {
            provide: BankAccountService,
            useFactory: (repo: BankAccountRepository) => {
                return new BankAccountService(repo)
            },
            inject: [BankAccountTypeOrmRepository],
        },
    ],
})
export class BankAccountsModule {}
