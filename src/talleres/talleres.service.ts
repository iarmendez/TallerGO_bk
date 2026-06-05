import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Taller } from './entities/talleres.entity';
import { TipoTaller } from 'src/tipo-talleres/entities/tipo-taller.entity';
import { haversine } from 'src/utils/functions/distance';

@Injectable()
export class TalleresService {
  constructor(
    @InjectRepository(Taller)
    private readonly tallerRepository: Repository<Taller>,
    @InjectRepository(TipoTaller)
    private readonly tipoTallerRepository: Repository<TipoTaller>,
  ) { }

  async create(createTallerDto: Partial<Taller>): Promise<Taller> {
    const tipoTaller = await this.tipoTallerRepository.findOne({
      where: { id: createTallerDto.tipoTaller?.id },
    });
    if (!tipoTaller) {
      throw new NotFoundException(
        `Tipo de taller con ID ${createTallerDto.tipoTaller?.id} no encontrado`,
      );
    }
    const taller = this.tallerRepository.create({
      ...createTallerDto,
      tipoTaller,
    });
    return await this.tallerRepository.save(taller);
  }

  async findSearch(
    search?: string,
    maxDistance?: number,
    latitude?: number,
    longitude?: number,
  ): Promise<Taller[]> {
    const query = this.tallerRepository
      .createQueryBuilder('taller')
      .leftJoinAndSelect('taller.empresa', 'empresa')
      .leftJoinAndSelect('taller.tipoTaller', 'tipoTaller')
      .where('taller.estaEliminado = :no', { no: 'NO' })
      .andWhere('taller.estaActivo = :si', { si: 'SI' });

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('taller.nombre LIKE :search', { search: `%${search}%` })
            .orWhere('taller.direccion LIKE :search', { search: `%${search}%` })
            .orWhere((subQb) => {
              const subQuery = subQb
                .subQuery()
                .select('1')
                .from('categorias', 'cat')
                .leftJoin(
                  'sub_categorias',
                  'subcat',
                  'subcat.idcategoria = cat.idcategoria',
                )
                .leftJoin(
                  'subcategorias_prodserv',
                  'scps',
                  'scps.idsubcategoria = subcat.idsubcategoria',
                )
                .leftJoin(
                  'producto_servicio',
                  'ps',
                  'ps.idprodserv = scps.idprodserv',
                )
                .leftJoin(
                  'prodserv_etiquetas',
                  'pe',
                  'pe.idprodserv = ps.idprodserv',
                )
                .leftJoin('etiquetas', 'eti', 'eti.idetiqueta = pe.idetiqueta')
                .where('cat.idtaller = taller.idtaller')
                .andWhere('eti.nombre LIKE :search')
                .andWhere('cat.eliminado = :no')
                .andWhere('subcat.eliminado = :no')
                .andWhere('scps.eliminado = :no')
                .andWhere('ps.eliminado = :no')
                .andWhere('pe.eliminado = :no')
                .andWhere('eti.eliminado = :no');
              return `EXISTS ${subQuery.getQuery()}`;
            });
        }),
      );
      query.setParameters({ search: `%${search}%`, no: 'NO', si: 'SI' });
    } else {
      query.setParameters({ no: 'NO', si: 'SI' });
    }
    const talleres = await query.getMany();

    let talleresResponse = talleres;
    if (maxDistance && latitude && longitude) {
      talleresResponse = talleres.filter((taller) => {
        const distance = haversine(
          latitude,
          longitude,
          taller.latitud,
          taller.longitud,
        );
        console.log(distance);
        return distance <= maxDistance;
      });
    }

    return talleresResponse.map((taller) => ({
      ...taller,
      distancia:
        latitude && longitude
          ? haversine(latitude, longitude, taller.latitud, taller.longitud)
          : 0,
    }));
  }

  async findAll(): Promise<Taller[]> {
    return this.findSearch();
  }

  async findOne(id: number): Promise<Taller> {
    const taller = await this.tallerRepository.findOne({
      where: { id },
      relations: ['empresa', 'tipoTaller'],
    });
    if (!taller)
      throw new NotFoundException(`Taller con ID ${id} no encontrado`);
    return taller;
  }

  async update(id: number, updateTallerDto: Partial<Taller>): Promise<Taller> {
    await this.tallerRepository.update(id, updateTallerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tallerRepository.delete(id);
  }
}
