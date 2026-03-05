import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_temas' }) // CREATE TABLE tb_temas

export class Tema {
  @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO INCREMENT
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim()) // Remover espaços em branco Início/Fim
  @IsNotEmpty({ message: 'A Descrição é Obrigatória' }) // Forçar digitação
  @Length(5, 255, { message: 'A Descrição deve ter entre 5 e 255 caracteres' })
  @Column({ length: 255, nullable: false }) //VARCHAR(255) NOT NULL
  descricao: string;

  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[]; // Array de retorno
}