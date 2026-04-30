import { Controller, Post, Body } from '@nestjs/common'
import { BankAccountService } from 'src/@core/domain/bank-account.service'

@Controller('bank-accounts')
export class BankAccountsController {
    public constructor(
        private readonly bankAccountService: BankAccountService,
    ) {}

    @Post()
    public create(@Body('account-number') accountNumber: string) {
        return this.bankAccountService.create(accountNumber)
    }
}
