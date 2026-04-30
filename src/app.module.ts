import { Module } from '@nestjs/common'
import { BankAccountsModule } from './bank-accounts/bank-accounts.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        BankAccountsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
