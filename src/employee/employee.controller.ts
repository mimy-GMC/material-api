import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.employeeService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
