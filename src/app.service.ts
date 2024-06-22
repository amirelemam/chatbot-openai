import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();
@Injectable()
export class AppService {
  openai() {
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
}
