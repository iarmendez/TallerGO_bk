import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresas.entity';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpresaDto: Partial<Empresa>): Promise<Empresa> {
    const empresa = this.empresaRepository.create(createEmpresaDto);
    return await this.empresaRepository.save(empresa);
  }

  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.find();
  }

  async findOne(id: number): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOne({ where: { id } });
    if (!empresa) throw new NotFoundException(`Empresa con ID ${id} no encontrada`);
    return empresa;
  }

  async update(id: number, updateEmpresaDto: Partial<Empresa>): Promise<Empresa> {
    await this.empresaRepository.update(id, updateEmpresaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.empresaRepository.delete(id);
  }
}
