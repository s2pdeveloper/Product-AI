import { IBase } from './base';

export interface IImage extends IBase {
  type: IImageType;
  name: string;
  image: string;
  status: string;
}
export enum IImageType {
  SLIDER = 'Slider',
}
