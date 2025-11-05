import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login/:id')
  login(@Body() body: any, @Param('id') id: string) {
    console.log(id);

    const accessToken = this.appService.login();
    return { message: 'done', success: true, data: accessToken };
  }
}
