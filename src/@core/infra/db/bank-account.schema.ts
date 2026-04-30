import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BankAccountSchema {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column({ type: 'decimal' })
    public balance: number

    @Column({ type: 'text' })
    public accountNumber: string
}
