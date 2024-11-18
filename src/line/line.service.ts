import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LineService {
  async lineNotify(id: number, washing_machine: string) {
    const apiUrl = 'https://notify-api.line.me/api/notify';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
    };

    try {
      const date = new Date();
      const thaiTime = date.toLocaleString('en-GB', {
        timeZone: 'Asia/Bangkok',
      });
      const data = {
        message: `การซักหมายเลข: ${id} ที่เครื่องหมายเลข ${washing_machine} เสร็จสิ้นเมื่อ ${thaiTime}`,
      };

      const response = await axios.post(apiUrl, data, { headers });

      if (response.data.status === 200) {
        return response.data;
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      console.error('🚀 ~ LineService ~ lineNotify ~ error:', error);
      throw new InternalServerErrorException();
    }
  }
}
