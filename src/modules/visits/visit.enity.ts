import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Car } from '../cars/car.entity';
import { Box } from '../boxes/box.entity';

@Table
export class Visit extends Model<Visit> {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ForeignKey(() => Car)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    carId: number;

    @ForeignKey(() => Box)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    boxId: number;

    @BelongsTo(() => Box)
    box: Box;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Car)
    car: Car;
}