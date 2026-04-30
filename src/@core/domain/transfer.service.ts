import { BankAccount } from './bank-account'

type TransferProps = {
    bankAccountSource: BankAccount
    bankAccountDestiny: BankAccount
    amount: number
}

export class TransferService {
    public transfer({
        bankAccountSource,
        bankAccountDestiny,
        amount,
    }: TransferProps) {
        bankAccountSource.debit(amount)
        bankAccountDestiny.credit(amount)
    }
}
