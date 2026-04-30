import { BankAccount } from './bank-account'

describe('Bank Account', () => {
    let bankAccount: BankAccount

    it('should create bank account', () => {
        bankAccount = new BankAccount('1', 1000, '1111')
        expect(bankAccount.id).toBe('1')
        expect(bankAccount.balance).toBe(1000)
        expect(bankAccount.accountNumber).toBe('1111')
    })

    it('should debit balance', () => {
        bankAccount.debit(500)
        expect(bankAccount.balance).toBe(500)
    })

    it('should credit balance', () => {
        bankAccount.credit(500)
        expect(bankAccount.balance).toBe(1000)
    })
})
