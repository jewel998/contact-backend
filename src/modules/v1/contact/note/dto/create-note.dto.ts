import { IsIn, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  body: string;

  @IsIn(['text', 'html'])
  format: 'text' | 'html';
}
