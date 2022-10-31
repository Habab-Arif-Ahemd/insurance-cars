import { UploadItem } from '../app/UploadItem';
import { OrderAttachmentType } from './OrderAttachmentType';


export interface PolicyOrderAttachment extends UploadItem {
   title: string;
   titleEn: string;
   titleAr: string;
   imageUrl: string;
   isInvalidFile: boolean;
} 
