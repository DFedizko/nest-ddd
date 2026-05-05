import { BankAccount } from './bank-account'

describe('Bank Account', () => {
    let bankAccount: BankAccount

    it('should create a bank account', () => {
        bankAccount = new BankAccount(1000, '1111', '1')
        expect(bankAccount.id).toBe('1')
        expect(bankAccount.balance).toBe(1000)
        expect(bankAccount.accountNumber).toBe('1111')
    })

    it('should debit an account', () => {
        bankAccount.debit(500)
        expect(bankAccount.balance).toBe(500)
    })

    it('should credit an account', () => {
        bankAccount.credit(500)
        expect(bankAccount.balance).toBe(1000)
    })
})
