import { Mapper } from '@app/core/base/mapper';
import { TheaterModel } from '@app/core/domain/theater.model';
import { CreateTheaterEntity } from '@app/data/repository/theater-app-repository/theater-app.entity';

export class TheaterAppCreateMapper extends Mapper<
  CreateTheaterEntity,
  TheaterModel
> {
  mapFrom(param: CreateTheaterEntity): TheaterModel {
    return {
      _id: '0',
      address: param.address,
      name: param.name,
      telephone: param.telephone,
    };
  }

  mapTo(param: TheaterModel): CreateTheaterEntity {
    return {
      address: param.address,
      name: param.name,
      telephone: param.telephone,
    };
  }
}
