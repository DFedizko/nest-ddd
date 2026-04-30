import { BankAccount } from './bank-account'

export interface BankAccountRepository {
    insert(bankAccount: BankAccount): Promise<BankAccount>
}
