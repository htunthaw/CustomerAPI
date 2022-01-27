import * as moment from 'moment';
import {Func} from '../util/func'

enum CustomerGender {
    female = '2-Frau',
    male = '1-Herr',
}

export class Customer{
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
    gender: string;
    email: string;
    dateOfBirth: string;   
    phone: string;
    location?: {
        street: string,
        city: string,
        state: string,
        country: string,
        timezone: string
    };   
    registerDate: string;
    updatedDate: string;
}

export class CustomerRequestDTO{
    CustomerCardNo : string;
}

export class CustomerResponseDTO{
    constructor(
        public customerCardNo: string,
        public lastName: string,
        public firstName: string,
        public emailAddress: string,
        public birthdate: string,
        public title: string,
    ) {}

    static from(customer: Customer): CustomerResponseDTO {
    return new CustomerResponseDTO(
        customer.id,
        customer.lastName,
        customer.firstName,
        customer.email,
        moment(customer.dateOfBirth).format("YYYYMMDD"),
        Func.getEnumKeyByEnumValue(CustomerGender, customer.gender)
    );
    }
}