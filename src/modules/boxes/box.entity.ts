import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Box extends Model<Box> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    number: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    state: Boolean;
}